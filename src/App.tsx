import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { Home } from './pages/home'
import { Contato } from './pages/contato'
import { Servicos } from './pages/servicos'
import { Portfolio } from './pages/portfolio'
import { Sobre } from './pages/sobre'
import { Menu } from './components/menu'
import { useEffect, useState } from 'react'
export function App() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/contato' element={<Contato />} />
                <Route path='/sobre' element={<Sobre />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/servicos' element={<Servicos />} />
            </Routes>
        </BrowserRouter>
    )
}