import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MdEventAvailable } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";

export function Consulta() {
  // Estado para armazenar os pets vindos do primeiro formulário
  const [petsCadastrados, setPetsCadastrados] = useState<any[]>([]);
  // Estado para armazenar as consultas deste formulário
  const [consultas, setConsultas] = useState<any[]>([]);

  useEffect(() => {
    // Recupera os pets cadastrados no primeiro código
    const enderecosArmazenados = localStorage.getItem('enderecos')
    if (enderecosArmazenados) {
      setPetsCadastrados(JSON.parse(enderecosArmazenados))
    }

    // Recupera consultas já salvas anteriormente
    const consultasSalvas = localStorage.getItem('consultas')
    if (consultasSalvas) {
      setConsultas(JSON.parse(consultasSalvas))
    }
  }, [])

  // REGRAS DE VALIDAÇÃO
  const regrasFormulario = z.object({
    crmv: z.literal("12345"), // Fixo conforme pedido
    nome: z.string().min(1, 'Selecione um pet.'),
    data: z.string().min(1, 'Campo obrigatório.'),
    hora: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Hora inválida"),
    motivo: z.string().min(1, 'Campo obrigatório.').max(100, 'Máximo 100 caracteres.'),
  })

  type TypeForm = z.infer<typeof regrasFormulario>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario),
    defaultValues: {
      crmv: "12345" // Já deixa o CRMV preenchido internamente
    }
  })

  // FUNÇÃO SALVAR CONSULTA
  function submeterFormulario(camposDoFormulario: TypeForm) {
    const novaLista = [...consultas, camposDoFormulario]
    setConsultas(novaLista)
    localStorage.setItem('consultas', JSON.stringify(novaLista))
    
    alert(`Consulta para o pet ${camposDoFormulario.nome} agendada com sucesso!`)
    formulario.reset({ crmv: "12345", nome: "", data: "", hora: "", motivo: "" })
  }

  function botaoCancelar() {
    formulario.reset({ crmv: "12345", nome: "", data: "", hora: "", motivo: "" })
  }

  return (
    <>
      {/* Cabeçalho do Médico */}
      <div className="max-w-md mx-auto mt-10 p-4 bg-zinc-100 text-white rounded-t-xl text-center shadow-lg">
        <FaStethoscope className="mx-auto bg-zinc-100 p-4 text-7xl text-green-400 mb-4 rounded-full" />
        <p className="text-center text-gray-700 mb-1 font-bold">DR. Silva</p>
        <p className="text-center text-gray-700 mb-1">
          CRMV 12345 <span className="text-sm uppercase tracking-widest opacity-70"> Clinica Geral Veterinária</span>
        </p>
      </div>

      {/* Formulário de Agendamento */}
      <div className='flex flex-col justify-center max-w-md mx-auto p-10 bg-white shadow-lg rounded-b-xl mb-10'>
        <MdEventAvailable className="mx-auto bg-zinc-100 p-4 text-7xl text-green-400 mb-4 rounded-full" />
        <h1 className="font-serif text-center mb-2 text-xl tracking-tight">Agendar Consultas</h1>
        <p className="text-center text-gray-400 mb-1">Selecione o Pet e preencha os detalhes da consulta.</p>
        <div className="border-b border-gray-200 my-6"></div>

        <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-4">
          
          {/* Escolha do Pet (Recuperado do LocalStorage) */}
          <div className="flex flex-col relative">
            <label className="text-left">Pet:</label>
            <select {...formulario.register('nome')} className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1 bg-white">
              <option value="">Selecione o pet...</option>
              {petsCadastrados.map((pet, index) => (
                <option key={index} value={pet.nome}>{pet.nome}</option>
              ))}
            </select>
            {formulario.formState.errors.nome && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.nome.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Campo Data */}
            <div className="flex flex-col relative">
              <label className="text-left">Data:</label>
              <input {...formulario.register('data')} type="date" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
              {formulario.formState.errors.data && (
                <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.data.message}</span>
              )}
            </div>

            {/* Campo Hora */}
            <div className="flex flex-col relative">
              <label className="text-left">Horário:</label>
              <input {...formulario.register('hora')} type="time" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
              {formulario.formState.errors.hora && (
                <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.hora.message}</span>
              )}
            </div>
          </div>

          {/* Campo Motivo */}
          <div className="flex flex-col relative">
            <label className="text-left">Motivo:</label>
            <textarea {...formulario.register('motivo')} className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1 h-24" placeholder="Descreva o motivo da consulta..." />
            {formulario.formState.errors.motivo && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.motivo.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button type="submit" className="p-2 border border-green-400 rounded-sm bg-green-500 text-white hover:bg-green-600 transition-colors">Agendar</button>
            <button type="button" onClick={botaoCancelar} className="p-2 border border-gray-300 rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200">Cancelar</button>
          </div>
        </form>
      </div>
    </>
  )
}
