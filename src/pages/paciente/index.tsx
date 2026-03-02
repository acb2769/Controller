import { NavLink } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { MdPets } from "react-icons/md";

export function Paciente() {
  const [enderecos, setEnderecos] = useState<TypeForm[]>([]);
  const [mostrarLista, setMostrarLista] = useState(false);

  useEffect(() => {
    const enderecosArmazenados = localStorage.getItem('enderecos')
    if (enderecosArmazenados) {
      setEnderecos(JSON.parse(enderecosArmazenados))
    }
  }, [])

  const regrasFormulario = z.object({
    nome: z.string().min(1, 'Campo obrigatório.').max(60, 'Máximo 60 caracteres.'),
    especie: z.string().min(1, 'Campo obrigatório.').max(20, 'Máximo 20 caracteres.'),
    raca: z.string().min(1, 'Campo obrigatório.').max(20, 'Máximo 20 caracteres.'),
    tutor: z.string().min(1, 'Campo obrigatório.').max(60, 'Máximo 60 caracteres.'), 
  })
    
  type TypeForm = z.infer<typeof regrasFormulario>

  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario)
  })

  // FUNÇÃO SALVAR
  function submeterFormulario(camposDoFormulario: TypeForm) {
    const jaExiste = enderecos.some(item => item.nome.toLowerCase() === camposDoFormulario.nome.toLowerCase() &&
                                    item.tutor.toLowerCase() === camposDoFormulario.tutor.toLowerCase())

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
    formulario.reset()
  }

  // FUNÇÃO CANCELAR
  function botaoCancelar() {
    formulario.reset()
  }

  return (
    <>
      <div className='flex flex-col justify-center mt-4 max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl mt-10'>
        <MdPets className="mx-auto bg-zinc-100 p-4 text-7xl text-5xl text-green-400 mb-4 rounded-full" />
        <h1 className="font-serif text-center mb-2 text-xl tracking-tight">Cadastrar de Pet</h1>
        <p className="text-center text-gray-400 mb-1">Preencha os dados do Pet e do seu Tutor.</p>
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
            <label className="text-left">Especie:</label>
            <input {...formulario.register('especie')} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.especie && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.especie.message}</span>
            )}
          </div>

          <div className="flex flex-col relative">
            <label className="text-left">Raça:</label>
            <input {...formulario.register('raca')} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.raca && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.raca.message}</span>
            )}
          </div>
       
          <div className="flex flex-col relative">
            <label className="text-left">Nome do tutor:</label>
            <input {...formulario.register('tutor')} type="text" className="border border-solid border-gray-400 mb-2 text-zinc-900 rounded-sm px-2 py-1" />
            {formulario.formState.errors.tutor && (
              <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.tutor.message}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button type="submit" className="p-2 border border-green-200 rounded-sm bg-green-200 text-zinc-500 hover:bg-gray-100">Salvar</button>
            <button type="button" onClick={botaoCancelar} className="p-2 border border-green-200 rounded-sm bg-green-200 text-zinc-500 hover:bg-gray-100">Cancelar</button>
          </div>
        </form>
      </div>

    </>
  )
}