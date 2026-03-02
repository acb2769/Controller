import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { Home } from './pages/home'
import { Paciente } from './pages/paciente/index.tsx'
import { Listagem } from './pages/listagem/index.tsx'
import { Consulta } from './pages/consulta/index.tsx'
import { Menu } from './components/menu'
import { useEffect, useState } from 'react'
export function App() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/paciente' element={<Paciente />} />
                <Route path='/consulta' element={<Consulta />} />
                <Route path='/listagem' element={<Listagem />} />
            </Routes>
        </BrowserRouter>
    )
}