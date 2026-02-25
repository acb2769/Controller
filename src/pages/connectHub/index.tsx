import { NavLink } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function ConnectHub() {
  const [enderecos, setEnderecos] = useState<TypeForm[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    const enderecosArmazenados = localStorage.getItem('enderecos')
    if (enderecosArmazenados) {
      setEnderecos(JSON.parse(enderecosArmazenados))
    }
  }, [])

  const regrasFormulario = z.object({
    nome: z.string().min(5, 'Campo obrigatório.').max(60, 'Máximo 60 caracteres.'),
    telefone: z.string().min(9, 'Campo obrigatório.'),
    email: z.string().min(1, 'Campo obrigatório.').email('Formato de email inválido.').toLowerCase(),
  })
    
  type TypeForm = z.infer<typeof regrasFormulario>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario)
  })

  // FUNÇÃO SALVAR
  function submeterFormulario(camposDoFormulario: TypeForm) {
    const jaExiste = enderecos.some(item => item.nome.toLowerCase() === camposDoFormulario.nome.toLowerCase())

    if (jaExiste) {
      const confirmar = confirm("Este nome já existe na lista. Deseja salvar mesmo assim?")
      if (!confirmar) {
        return;
      }
    }

    const novaLista = [...enderecos, camposDoFormulario]
    setEnderecos(novaLista)
    localStorage.setItem('enderecos', JSON.stringify(novaLista))
    alert("Dados salvos com sucesso!")
  }

  // FUNÇÃO NOVO
  function botaoNovo() {
    formulario.reset()
    alert("Tela limpa para novo cadastro!")
  }

  // FUNÇÃO DELETAR
  function deletarPorNumero() {
    const numeroStr = prompt("Digite o número do contato que deseja remover:")
    const numero = parseInt(numeroStr || "0") - 1

    if (numero >= 0 && numero < enderecos.length) {
      const novaLista = enderecos.filter((_, index) => index !== numero)
      setEnderecos(novaLista)
      localStorage.setItem('enderecos', JSON.stringify(novaLista))
    } else {
      alert("Número inválido ou não encontrado.")
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center mt-4 max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl mt-10'>
        <h1 className="font-serif text-left mb-2 text-xl tracking-tight">connectHub<span className="text-amber-500">.</span></h1>
        <div className="border-b border-gray-200 my-6"></div>
        
        <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-4">
          <div className="flex flex-col relative">
            <label className="text-left">Nome:</label>
            <input {...formulario.register('nome')} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.nome && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.nome.message}</span>
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-left">Telefone:</label>
            <input {...formulario.register("telefone")} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.telefone && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.telefone.message}</span>
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-left">e-mail:</label>
            <input {...formulario.register("email")} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.email && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.email.message}</span>
            )}
          </div>

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

      <div className="mt-6 max-w-md mx-auto">
        {mostrarLista && enderecos.map((endereco, index) => (
          <p className="text-center bg-gray-50 p-2 mb-1 border-b" key={index}>
            {`${index + 1}. ${endereco.nome} | ${endereco.telefone}`}
          </p>
        ))}
      </div>
    </>
  )
}