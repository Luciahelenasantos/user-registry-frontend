import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BreadcrumbProps {
  children: React.ReactNode
}

export function Breadcrumb({ children }: BreadcrumbProps) {
  return (
    <nav className="text-muted-foreground flex items-center space-x-2 text-sm">
      {children}
    </nav>
  )
}

interface BreadcrumbItemProps {
  href: string
  children: React.ReactNode
}

export function BreadcrumbItem({ href, children }: BreadcrumbItemProps) {
  return (
    <div className="flex items-center">
      <Link href={href} className="text-blue-500 hover:underline">
        {children}
      </Link>
      <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
    </div>
  )
}
