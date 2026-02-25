import { NavLink, useLocation } from "react-router-dom";

export interface IMenu {
    routeSelected: string
}
export function Menu() {
    const { pathname } = useLocation()
    const routeSelected = pathname
    console.log('location', location)

    const selectedCss = 'py-2 px-4 rounded-xl bg-amber-500 text-zinc-50'
    return (    
        <nav className="bg-cyan-900 h-16 flex items-center justify-between px-8 text-zinc-100">
            <h1 className="font-serif text-xl tracking-tight">Controller<span className="text-amber-500">.</span></h1>
            <ul className="flex gap-6 font-sans">
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl "><NavLink to="/" className={`${routeSelected === '/' ? selectedCss : ''}`}>Home</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/moneyFlow" className={`${routeSelected === '/moneyFlow' ? selectedCss : ''}`}>moneyFlow</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/connectHub" className={`${routeSelected === '/connectHub' ? selectedCss : ''}`}>connectHub</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/taskMaster" className={`${routeSelected === '/taskMaster' ? selectedCss : ''}`}>taskMaster</NavLink></li>
                <li className=" hover:text-zinc-50 text-zinc-400 rounded-xl"><NavLink to="/exit" className={`${routeSelected === '/exit' ? selectedCss : ''}`}>Exit</NavLink></li>
            </ul>
        </nav>
    )
}