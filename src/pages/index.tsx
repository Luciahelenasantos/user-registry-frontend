import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Breadcrumb, BreadcrumbItem } from '../components/breadcumb/breadcumb'
import { Alert } from '../components/feedback/alert'
import { Toast } from '../components/feedback/toast'
import MainContent from '../components/main-content'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Loader } from '../components/utilities/loader'

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const router = useRouter() // Inicializar o router

  useEffect(() => {
    async function fetchData() {
      try {
        // Simula um carregamento bem-sucedido
        setLoading(false)
      } catch {
        setLoading(false)
        setError('Falha ao carregar os dados do servidor')
        setShowToast(true)
      }
    }

    fetchData()
  }, [])

  // Função para redirecionar para a página de cadastro
  const handleCadastroUsuario = () => {
    router.push('/users/cadastrar')
  }

  return (
    <>
      <Head>
        <title>Gerenciamento de Usuários</title>
      </Head>
      <div className="container mx-auto p-6">
        <MainContent className="flex-grow">
          <Breadcrumb>
            <BreadcrumbItem href="/">Início</BreadcrumbItem>
          </Breadcrumb>

          {/* Mostrando o Loader enquanto carrega os dados */}
          {loading ? (
            <Loader size="large" color="primary" />
          ) : (
            <>
              {/* Caso haja erro, exiba um Alert */}
              {error ? (
                <Alert
                  type="error"
                  title="Erro de Conexão"
                  description={error}
                />
              ) : (
                <>
                  <h1 className="text-2xl font-bold">
                    Bem-vindo ao sistema de gerenciamento de usuários!
                  </h1>
                  <p>Gerencie seus usuários de forma simples e eficiente.</p>

                  {/* Card para exibir informações ou ações principais */}
                  <Card className="p-4">
                    <h2 className="text-xl font-semibold">Ações Rápidas</h2>
                    <Button className="mt-4" onClick={handleCadastroUsuario}>
                      Cadastrar Novo Usuário
                    </Button>
                  </Card>
                </>
              )}
            </>
          )}

          {/* Toast de feedback */}
          {showToast && (
            <Toast
              type="success"
              message="Bem-vindo ao sistema de usuários!"
              onClose={() => setShowToast(false)}
            />
          )}
        </MainContent>
      </div>
    </>
  )
}
