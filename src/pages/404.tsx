import React from 'react'

import { Alert } from '../components/feedback/alert'
import { NavLink } from '../components/nav-link'
import { ThemeToggle } from '../components/theme/theme-toggle'
import { Button } from '../components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      {/* Alert para avisar sobre a página não encontrada */}
      <Alert
        type="warning"
        title="Página não encontrada"
        description="Desculpe, a página que você está procurando não existe."
      />

      <h1 className="text-4xl font-bold">404 - Página não encontrada</h1>
      <p className="text-accent-foreground">
        Volte para a{' '}
        <NavLink href="/" className="text-sky-500 dark:text-sky-400">
          Home
        </NavLink>
        .
      </p>

      {/* Botão para voltar à página inicial */}
      <Button className="mt-4" onClick={() => (window.location.href = '/')}>
        Voltar ao Início
      </Button>

      {/* Opção para alternar entre temas */}
      <div className="mt-6">
        <ThemeToggle />
      </div>
    </div>
  )
}
