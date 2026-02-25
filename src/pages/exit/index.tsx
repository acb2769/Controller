import { NavLink } from "react-router-dom";

export function Exit() {

    return (
        <>
        <div className="max-w-md mx-auto p-10 bg-white shadow-lg rounded-xl mt-20">
            <h1 className="font-serif text-2xl tracking-tight font-bold mb-6 text-center">Obrigado por visitar o Controller<span className="text-amber-500">.</span>
            </h1>
            <div className="border-b border-gray-200 my-6"></div>
            <h2 className="font-sans text-lg font-bold mb-4">Esperamos ter atingido suas expectativas.</h2>
            <h3 className="font-sans text-lg font-bold mb-2">Estaremos esperando o seu retorno!</h3>
         </div>
        </>
    )
}