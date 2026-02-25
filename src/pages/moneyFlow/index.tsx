import { NavLink } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function MoneyFlow() {
  const [gastos, setGastos] = useState<TypeForm[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    const gastosArmazenados = localStorage.getItem('moneyflow_v2')
    if (gastosArmazenados) {
      setGastos(JSON.parse(gastosArmazenados))
    }
  }, [])

  // Regras do Formulário
  const regrasFormulario = z.object({
    descricao: z.string().min(3, 'Mínimo 3 caracteres.'),
    valor: z.coerce.number().gt(0, 'O valor deve ser maior que zero.'),
    tipo: z.enum(['Receber', 'Pagar'], {
      errorMap: () => ({ message: 'Selecione o tipo.' }),
    }),
  })
    
  type TypeForm = z.infer<typeof regrasFormulario>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario)
  })

  // LÓGICA DO SALDO: Soma se for 'Receber', Subtrai se for 'Pagar'
  const saldoTotal = gastos.reduce((acumulador, item) => {
    return item.tipo === 'Receber' 
      ? acumulador + item.valor 
      : acumulador - item.valor;
  }, 0);

  function submeterFormulario(camposDoFormulario: TypeForm) {
    const jaExiste = gastos.some(item => item.descricao.toLowerCase() === camposDoFormulario.descricao.toLowerCase())

    if (jaExiste) {
      const confirmar = confirm("Já existe um lançamento com esta descrição. Deseja salvar mesmo assim?")
      if (!confirmar) return;
    }

    const novaLista = [...gastos, camposDoFormulario]
    setGastos(novaLista)
    localStorage.setItem('moneyflow_v2', JSON.stringify(novaLista))
    alert("Lançamento efetuado!")
  }

  function botaoNovo() {
    formulario.reset()
  }

  function deletarPorNumero() {
    const numeroStr = prompt("Digite o número do item que deseja remover:")
    const index = parseInt(numeroStr || "0") - 1

    if (index >= 0 && index < gastos.length) {
      const novaLista = gastos.filter((_, i) => i !== index)
      setGastos(novaLista)
      localStorage.setItem('moneyflow_v2', JSON.stringify(novaLista))
    } else {
      alert("Item não encontrado.")
    }
  }

  return (
    <>
      {/* SALDO NO TOPO (Pode ser negativo) */}
      <div className="max-w-md mx-auto mt-10 p-4 bg-zinc-900 text-white rounded-t-xl text-center shadow-lg">
        <span className="text-sm uppercase tracking-widest opacity-70">Saldo Atual</span>
        <h2 className={`text-3xl font-bold ${saldoTotal >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          R$ {saldoTotal.toFixed(2)}
        </h2>
      </div>

      <div className='flex flex-col justify-center max-w-md mx-auto p-10 bg-white shadow-lg rounded-b-xl mb-10'>
        <h1 className="font-serif text-left mb-2 text-xl tracking-tight">moneyFlow<span className="text-amber-500">.</span></h1>
        <div className="border-b border-gray-200 my-6"></div>
        
        <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-4">
          
          <div className="flex flex-col relative">
            <label className="text-left">Descrição:</label>
            <input {...formulario.register('descricao')} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.descricao && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.descricao.message}</span>
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-left">Valor:</label>
            <input {...formulario.register("valor")} type="number" step="0.01" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.valor && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.valor.message}</span>
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-left">Tipo de Lançamento:</label>
            <select {...formulario.register("tipo")} className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1 bg-white">
              <option value="">Selecione...</option>
              <option value="Receber">A Receber (+)</option>
              <option value="Pagar">A Pagar (-)</option>
            </select>
            {formulario.formState.errors.tipo && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.tipo.message}</span>
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

      {/* LISTAGEM COM CORES CONDICIONAIS */}
      <div className="mt-6 max-w-md mx-auto">
        {mostrarLista && gastos.map((g, index) => (
          <div key={index} className="flex justify-between bg-white p-3 mb-1 border rounded shadow-sm text-sm">
            <span><strong>{index + 1}.</strong> {g.descricao}</span>
            <span className={`font-bold ${g.tipo === 'Receber' ? 'text-blue-900' : 'text-red-600'}`}>
              {g.tipo === 'Receber' ? '+' : '-'} R$ {g.valor.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}