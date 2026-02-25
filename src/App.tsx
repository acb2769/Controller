import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { Home } from './pages/home'
import { Exit } from './pages/exit'
import { ConnectHub } from './pages/connectHub'
import { TaskMaster } from './pages/taskMaster'
import { MoneyFlow } from './pages/moneyFlow'
import { Menu } from './components/menu'
import { useEffect, useState } from 'react'
export function App() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/exit' element={<Exit />} />
                <Route path='/moneyFlow' element={<MoneyFlow />} />
                <Route path='/taskMaster' element={<TaskMaster />} />
                <Route path='/connectHub' element={<ConnectHub />} />
            </Routes>
        </BrowserRouter>
    )
}