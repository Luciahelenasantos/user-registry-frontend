import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Table } from '@/src/components/ui/table'

import { deletarUser } from '../../api/users/deletarUser'
import { listarUsers, UserResponse } from '../../api/users/listarUsers'
import {
  Breadcrumb,
  BreadcrumbItem,
} from '../../components/breadcumb/breadcumb'
import { Toast } from '../../components/feedback/toast'
import { Loader } from '../../components/utilities/loader'

export function ListarUsers() {
  const [users, setUsers] = useState<UserResponse[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([])
  const [search, setSearch] = useState('') // Campo de busca
  const [error, setError] = useState('') // Mensagem de erro
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Adicionado controle de carregamento
  const router = useRouter()

  // Carregar lista de usuários ao montar o componente
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await listarUsers()
        setUsers(data)
        setFilteredUsers(data) // Inicialmente, mostrar todos os usuários
      } catch (err) {
        setError('Erro ao listar usuários')
        console.error(err)
      } finally {
        setIsLoading(false) // Carregamento finalizado
      }
    }
    fetchUsers()
  }, [])

  // Função de busca por CPF ou email
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase()
    setSearch(value)
    setFilteredUsers(
      users.filter(
        (user) =>
          user.email.toLowerCase().includes(value) || user.cpf.includes(value),
      ),
    )
  }

  // Função para deletar um usuário
  const handleDelete = async (id: string) => {
    setIsDeleting(id)
    try {
      await deletarUser(id)
      setUsers(users.filter((user) => user.id !== id))
      setToast({ type: 'success', message: 'Usuário deletado com sucesso!' })
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error)
      setError('Erro ao deletar o usuário')
      setToast({ type: 'error', message: 'Erro ao deletar o usuário!' })
    } finally {
      setIsDeleting(null)
    }
  }

  // Função para redirecionar para a página de edição
  function handleEditUser(id: string) {
    // Redireciona para a rota correta para editar o usuário
    router.push(`/users/${id}`)
  }

  if (isLoading) return <Loader /> // Mostrando o Loader enquanto os dados carregam

  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb>
        <BreadcrumbItem href="/">Início</BreadcrumbItem>
        <BreadcrumbItem href="/users">Usuários</BreadcrumbItem>
      </Breadcrumb>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="mb-4 text-2xl font-semibold">Lista de Usuários</h1>

      <Input
        className="mb-4 w-full"
        type="text"
        placeholder="Buscar por email ou CPF"
        value={search}
        onChange={handleSearch}
      />

      {error && <p className="text-red-500">{error}</p>}

      <Card className="bg-white p-4 shadow-md">
        <Table>
          <thead>
            <tr>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">CPF</th>
              <th className="p-2 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="p-2">{user.nome}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.cpf}</td>
                <td className="flex space-x-2 p-2">
                  <Button
                    variant="default"
                    onClick={() => handleEditUser(user.id)} // Chama a função handleEditUser aqui
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(user.id)}
                    disabled={isDeleting === user.id}
                  >
                    {isDeleting === user.id ? 'Deletando...' : 'Deletar'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  )
}

export default ListarUsers
