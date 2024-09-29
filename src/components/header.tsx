import { Home, List, PlusCircle, Users } from 'lucide-react'
import React from 'react'

import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './utilities/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Users className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink href="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink href="/users">
            <List className="h-4 w-4" />
            Listar Usuários
          </NavLink>
          <NavLink href="/users/cadastrar">
            <PlusCircle className="h-4 w-4" />
            Cadastrar Usuário
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
