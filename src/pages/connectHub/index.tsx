import { NavLink } from "react-router-dom";

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export function ConnectHub() {
  // "BANCO DE DADOS - APENAS NA APLICAÇÃO" de endereços
  const [enderecos, setEnderecos] = useState<TypeForm[]>([]);

  useEffect(() => {
    const enderecosArmazenados = localStorage.getItem('enderecos')// Busca as informações do LocalStorage onde a chave é 'enderecos'

    if (enderecosArmazenados === null) {
      return setEnderecos([])
    } // Verifica se o localStorage é null, caso seja, inicia o estado enderecos como um array vazio

    setEnderecos(JSON.parse(enderecosArmazenados)) // Caso possua valores no localStorage, este valor é inserido no enderecos (state), realizando o parse do JSON retornado.

  }, [])
  // Regras do Formulário
  const regrasFormulario = z.object({
    nome: z.string().min(5, 'Campo obrigatório.').max(60, 'Máximo 60 caracteres.'),
    telefone: z.string().min(9, 'Campo obrigatório.'),
    email: z.string().trim().min(1, 'Campo obrigatório.').toLowerCase().pipe(z.email('Formato de email inválido.')),
  })
    
  type TypeForm = z.infer<typeof regrasFormulario>
  // Criação do formulário com React Hook Form
  // { handleSubmit, register, formState: {errors} }
  const formulario = useForm<TypeForm>({
    resolver: zodResolver(regrasFormulario)
  })

  // Submissão do formulário
  function submeterFormulario(camposDoFormulario: TypeForm) {
    setEnderecos(oldState => [...oldState, camposDoFormulario])
    formulario.reset();
    localStorage.setItem('enderecos', JSON.stringify([...enderecos, camposDoFormulario])) // transforma o json em string para ser inserido no localStorage da chave 'enderecos'. 
  }

  return (
    <>
  <div> 
    <div className='flex flex-col justify-center mt-4 max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl mt-10'>
      <h1 className="font-serif text-left mb-2 left-0 text-xl tracking-tight">ConnectHub<span className="text-amber-500">.</span></h1>
      <div className="border-b border-gray-200 my-6"></div>
      <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-4">
        <div className="flex flex-col relative">
          <label className="text-left">Nome:</label>
          <input {...formulario.register('nome')} type="text" className="border-1 border-solid border-gray-400 mb-2 text-zinc-900 text-left max-w-[400px] rounded-sm px-2 py-1" />
          {formulario.formState.errors.nome && (
            <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.nome.message}</span>
          )}
        </div>
        <div className="flex flex-col relative">
          <label className="text-left">Telefone:</label>
          <input {...formulario.register("telefone")} type="text" className="border-1 border-solid border-gray-400 mb-2 text-zinc-900 text-left max-w-[400px] rounded-sm px-2 py-1" />
          {formulario.formState.errors.telefone && (
            <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.telefone.message}</span>
          )}
        </div>
        <div className="flex flex-col relative">
          <label className="text-left">e-mail:</label>
          <input {...formulario.register("email")} type="text" className="border-1 border-solid border-gray-400 mb-2 text-zinc-900 text-left max-w-[400px] rounded-sm px-2 py-1" />
          {formulario.formState.errors.email && (
            <span className="text-red-500 text-xs absolute -bottom-2 left-0">{formulario.formState.errors.email.message}</span>
          )}
        </div>
        <div className="flex max-w-[400px] gap-4 justify-end mt-4">
          <button type="reset" onClick={() => formulario.reset()} className="p-2 border border-zinc-600 rounded-sm">Reset</button>
          <button className="p-2 border border-zinc-600 rounded-sm bg-zinc-900 text-zinc-50">Enviar</button>
        </div>
      </form>
  </div>
      <div>
        {enderecos.length > 0 && enderecos.map((endereco, index) => {
          return (
            <>
              <p className="text-center" key={index}>{`Contato ${index + 1}: Nome: ${endereco.nome} Telefone: ${endereco.telefone} Email: ${endereco.email}`}</p>
            </>
          )
        })}
      </div>
  </div>  
    </>
  )
}