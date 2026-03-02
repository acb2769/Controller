import { NavLink, useLocation } from "react-router-dom";
import { MdPets } from "react-icons/md";

export interface IMenu {
    routeSelected: string
}
export function Menu() {
    const { pathname } = useLocation()
    const routeSelected = pathname
    console.log('location', location)

    const selectedCss = 'py-2 px-4 rounded-xl bg-green-100 text-zinc-300'
    return (
        <nav className="bg-white-900 h-16 flex border border-zinc-200 shadow-lg items-center justify-between px-8 text-green-200">
            <h1 className="font-serif flex items-center gap-2 font-bold ml-8 text-xl tracking-tight">
                <MdPets className="text-green-300" /> <span>PetHealth Lite</span> </h1>
            <ul className="flex gap-6 font-sans">
                <li className=" hover:text-zinc-200 text-zinc-400 rounded-xl "><NavLink to="/" className={`${routeSelected === '/' ? selectedCss : ''}`}>Home</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/paciente" className={`${routeSelected === '/paciente' ? selectedCss : ''}`}>Pacientes</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/consulta" className={`${routeSelected === '/consulta' ? selectedCss : ''}`}>Consultas</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/listagem" className={`${routeSelected === '/listagem' ? selectedCss : ''}`}>Listagem</NavLink></li>
           </ul>
        </nav>
    )
}