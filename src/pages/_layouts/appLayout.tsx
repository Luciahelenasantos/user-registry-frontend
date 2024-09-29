import React, { useEffect, useState } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
} from '../../components/breadcumb/breadcumb'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { Sidebar } from '../../components/sidebar'
import { Loader } from '../../components/utilities/loader'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  // Simular um estado de carregamento inicial, você pode substituir essa lógica conforme necessário.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000) // Exemplo de carregamento de 1 segundo
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Sidebar para navegação lateral */}
        <Sidebar />

        {/* Conteúdo principal */}
        <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
          {/* Breadcrumb para navegação hierárquica */}
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            {/* Adicione mais itens conforme a página */}
          </Breadcrumb>

          {/* Exibe Loader enquanto estiver carregando */}
          {loading ? <Loader size="large" color="primary" /> : children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
