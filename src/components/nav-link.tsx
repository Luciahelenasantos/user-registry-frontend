import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string // Adicione a propriedade className
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <Link
      href={href}
      className={`text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm font-medium ${isActive ? 'text-foreground' : ''} ${className || ''}`} // Aplique a classe condicionalmente
    >
      {children}
    </Link>
  )
}
