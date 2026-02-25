import { NavLink } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function TaskMaster() {
  // Estado para armazenar a lista de tarefas
  const [tarefas, setTarefas] = useState<TypeForm[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    const tarefasArmazenadas = localStorage.getItem('tarefas')
    if (tarefasArmazenadas) {
      setTarefas(JSON.parse(tarefasArmazenadas))
    }
  }, [])

  // Regras do Formulário para Tarefas
  const regrasFormulario = z.object({
    numero: z.string().min(1, 'Campo obrigatório.'),
    descricao: z.string().min(5, 'Mínimo 5 caracteres.').max(15, 'Máximo 15 caracteres.'),
    categoria: z.enum(["Trabalho", "Pessoal", "Urgente"], {
    error: "Selecione uma categoria válida"
    }),
  })
    
  type TypeForm = z.infer<typeof regrasFormulario>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario)
  })

  // FUNÇÃO SALVAR (Verifica duplicados pelo número da tarefa)
  function submeterFormulario(camposDoFormulario: TypeForm) {
    const jaExiste = tarefas.some(item => item.numero === camposDoFormulario.numero)

    if (jaExiste) {
      const confirmar = confirm("Este número de tarefa já existe. Deseja salvar mesmo assim?")
      if (!confirmar) {
        return;
      }
    }

    const novaLista = [...tarefas, camposDoFormulario]
    setTarefas(novaLista)
    localStorage.setItem('tarefas', JSON.stringify(novaLista))
    alert("Tarefa salva com sucesso!")
  }

  // FUNÇÃO NOVO (Limpa a tela)
  function botaoNovo() {
    formulario.reset()
    alert("Tela limpa para nova tarefa!")
  }

  // FUNÇÃO DELETAR (Pede a posição na lista)
  function deletarPorNumero() {
    const numeroStr = prompt("Digite o item da lista que deseja remover (1, 2, 3...):")
    const index = parseInt(numeroStr || "0") - 1

    if (index >= 0 && index < tarefas.length) {
      const novaLista = tarefas.filter((_, i) => i !== index)
      setTarefas(novaLista)
      localStorage.setItem('tarefas', JSON.stringify(novaLista))
    } else {
      alert("Item não encontrado.")
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center mt-4 max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl mt-10'>
        <h1 className="font-serif text-left mb-2 text-xl tracking-tight">taskMaster<span className="text-amber-500">.</span></h1>
        <div className="border-b border-gray-200 my-6"></div>
        
        <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-4">
          
          {/* CAMPO NÚMERO */}
          <div className="flex flex-col relative">
            <label className="text-left">Identificador pessoal de tarefa:</label>
            <input {...formulario.register('numero')} type="number" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.numero && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.numero.message}</span>
            )}
          </div>

          {/* CAMPO DESCRIÇÃO (TAREFA) */}
          <div className="flex flex-col relative">
            <label className="text-left">Tarefa:</label>
            <input {...formulario.register("descricao")} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.descricao && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.descricao.message}</span>
            )}
          </div>

          {/* CAMPO CATEGORIA (SELECT) */}
          <div className="flex flex-col relative">
            <label className="text-left">Categoria:</label>
            <select {...formulario.register("categoria")} className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1 bg-white">
              <option value="">Selecione...</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Urgente">Urgente</option>
            </select>
            {formulario.formState.errors.categoria && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.categoria.message}</span>
            )}
          </div>

          {/* BOTÕES */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button type="button" onClick={botaoNovo} className="p-2 border border-zinc-600 rounded-sm hover:bg-gray-100">Novo</button>
            <button type="button" onClick={() => setMostrarLista(!mostrarLista)} className="p-2 border border-blue-600 text-blue-600 rounded-sm">
              {mostrarLista ? 'Ocultar' : 'Listar'}
            </button>
            <button type="button" onClick={deletarPorNumero} className="p-2 border border-red-600 text-red-600 rounded-sm">Deletar</button>
            <button type="submit" className="p-2 border border-zinc-600 rounded-sm bg-zinc-900 text-zinc-50">Salvar</button>
          </div>
        </form>
      </div>

      {/* LISTAGEM */}
      <div className="mt-6 max-w-md mx-auto">
        {mostrarLista && tarefas.map((t, index) => (
          <p className="text-center bg-gray-50 p-2 text-sm" key={index}>
            <strong>{index + 1}.</strong> {t.numero} - {t.descricao} [{t.categoria}]
          </p>
        ))}
      </div>
    </>
  )
}
