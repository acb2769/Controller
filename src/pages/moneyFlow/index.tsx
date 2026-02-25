import { NavLink } from "react-router-dom";

export function MoneyFlow() {

    return (
        <>
            <h1>Exemplo de página de fluxo financeiro - moneyFlow</h1>
            <NavLink className='text-xs text-cyan-800 underline' to={'/'}>Link para página inicial</NavLink>
        </>
    )
}