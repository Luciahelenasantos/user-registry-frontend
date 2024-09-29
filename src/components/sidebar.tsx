import { Home, PlusSquare, Users } from 'lucide-react'
import React from 'react'

import { NavLink } from './nav-link' // Importando o componente NavLink

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-blue-900 text-white">
      <div className="p-4 text-2xl font-semibold">User Registry</div>
      <nav className="flex flex-col space-y-2 p-4">
        <NavLink
          href="/"
          className="flex items-center text-white hover:text-teal-300"
        >
          <Home className="mr-2 h-6 w-6" />
          <span>Início</span>
        </NavLink>
        <NavLink
          href="/users"
          className="flex items-center text-white hover:text-teal-300"
        >
          <Users className="mr-2 h-6 w-6" />
          <span>Usuários</span>
        </NavLink>
        <NavLink
          href="/users/cadastrar"
          className="flex items-center text-white hover:text-teal-300"
        >
          <PlusSquare className="mr-2 h-6 w-6" />
          <span>Cadastrar Usuário</span>
        </NavLink>
      </nav>
    </div>
  )
}
