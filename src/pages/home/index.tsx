import { NavLink } from "react-router-dom";

export function Home() {

    return (
        <>
         <div className="max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl mt-20">
            <h1 className="font-serif text-2xl tracking-tight font-bold mb-6 text-center">Bem vindos ao Controller<span className="text-amber-500">.</span>
            </h1>
            <div className="border-b border-gray-200 my-6"></div>
            <h2 className="font-sans text-lg font-bold mb-4">Um ecossistema para ajudar no controle de seus projetos pessoais.</h2>
                <h3 className="font-sans text-lg font-bold mb-2">Módulo moneyFlow:</h3>
                <div className="flex flex-col">   
                    <p className="font-sans text-md font-medium mb-4 border border-gray-200 shadow-p p-2 rounded">
                        Para o controle de suas finanças</p>
                </div>
                <h3 className="font-sans text-lg font-bold mb-2">Módulo connectHub:</h3>
                <div className="flex flex-col">   
                    <p className="font-sans text-md font-medium mb-4 border border-gray-200 shadow-p p-2 rounded">
                        Para o cadastro de seus contatos e conexões</p>
                </div>
                <h3 className="font-sans text-lg font-bold mb-2">Módulo taskMaster:</h3>
                <div className="flex flex-col">   
                    <p className="font-sans text-md font-medium mb-4 border border-gray-200 shadow-p p-2 rounded">
                        Para o cadastro e controle de suas tarefas diárias</p>
                </div>
        </div>
        </>
    )
}