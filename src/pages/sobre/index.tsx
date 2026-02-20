import { NavLink } from "react-router-dom";

export function Sobre() {

    return (
        <>
            <h1>Exemplo de página sobre</h1>
            <NavLink className='text-xs text-cyan-800 underline' to={'/'}>Link para página inicial</NavLink>
        </>
    )
}