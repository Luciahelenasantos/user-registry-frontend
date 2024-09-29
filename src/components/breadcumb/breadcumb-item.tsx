import Link from 'next/link'
import React from 'react'

interface BreadcrumbItemProps {
  href: string
  children: React.ReactNode
}

export function BreadcrumbItem({ href, children }: BreadcrumbItemProps) {
  return (
    <Link href={href} className="text-blue-500 hover:underline">
      {children}
    </Link>
  )
}
