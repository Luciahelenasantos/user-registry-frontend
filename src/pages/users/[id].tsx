import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import {
  atualizarUser,
  AtualizarUserRequest,
  UserResponse, // Importa a interface da resposta
} from '@/src/api/users/atualizarUser'
import { buscarUserPorId } from '@/src/api/users/buscarUserPorId'
import { FormField } from '@/src/components/form/form-field'
import { NavLink } from '@/src/components/nav-link'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Loader } from '@/src/components/utilities/loader'

export default function EditarUser() {
  const router = useRouter()
  const { id } = router.query as { id: string } // Pega o ID da URL e garante que é string

  const [userData, setUserData] = useState<AtualizarUserRequest>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    complemento: '',
  })

  const [updatedUserData, setUpdatedUserData] = useState<UserResponse | null>(
    null,
  ) // Estado para exibir os dados atualizados
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    // Busca os dados do usuário pelo ID
    if (id) {
      buscarUserPorId(id)
        .then((user) => setUserData(user))
        .catch(() => setErrorMessage('Erro ao carregar os dados do usuário'))
        .finally(() => setIsLoading(false))
    }
  }, [id])

  // Validação com Yup
  const schema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string()
      .matches(
        /\d{3}\.\d{3}\.\d{3}-\d{2}/,
        'CPF deve estar no formato XXX.XXX.XXX-XX',
      )
      .required('CPF é obrigatório'),
    email: Yup.string()
      .email('Email deve ser válido')
      .required('Email é obrigatório'),
    telefone: Yup.string()
      .matches(
        /\(\d{2}\) 9?\d{4}-\d{4}/,
        'Telefone deve estar no formato (XX) XXXXX-XXXX',
      )
      .required('Telefone é obrigatório'),
    cep: Yup.string()
      .matches(/\d{5}-\d{3}/, 'CEP deve estar no formato XXXXX-XXX')
      .required('CEP é obrigatório'),
    numero: Yup.string().required('Número é obrigatório'),
    complemento: Yup.string(),
  })

  // Função para atualizar os dados do usuário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await schema.validate(userData, { abortEarly: false })
      const updatedUser = await atualizarUser(id, userData) // Chama a função que retorna os dados atualizados
      setUpdatedUserData(updatedUser) // Define os dados atualizados para exibição
      setSuccessMessage('Usuário atualizado com sucesso!')
      setErrorMessage(null) // Limpa a mensagem de erro após sucesso
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors.join(', '))
      } else {
        setErrorMessage('Erro ao atualizar usuário')
      }
      console.error('Erro ao atualizar usuário:', error)
      setSuccessMessage(null)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6">
        <h1 className="mb-4 text-2xl font-semibold">Editar Usuário</h1>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        {/* Links de navegação */}
        <div className="mb-4">
          <NavLink href="/users">Voltar para Lista de Usuários</NavLink>
        </div>

        {/* Conectando o handleSubmit ao formulário */}
        <form onSubmit={handleSubmit}>
          <FormField label="Nome">
            <Input
              type="text"
              placeholder="Nome"
              value={userData.nome}
              onChange={(e) =>
                setUserData({ ...userData, nome: e.target.value })
              }
            />
          </FormField>
          <FormField label="CPF">
            <Input
              type="text"
              placeholder="CPF"
              value={userData.cpf}
              onChange={(e) =>
                setUserData({ ...userData, cpf: e.target.value })
              }
            />
          </FormField>
          <FormField label="Email">
            <Input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </FormField>
          <FormField label="Telefone">
            <Input
              type="tel"
              placeholder="Telefone"
              value={userData.telefone}
              onChange={(e) =>
                setUserData({ ...userData, telefone: e.target.value })
              }
            />
          </FormField>
          <FormField label="CEP">
            <Input
              type="text"
              placeholder="CEP"
              value={userData.cep}
              onChange={(e) =>
                setUserData({ ...userData, cep: e.target.value })
              }
            />
          </FormField>
          <FormField label="Número">
            <Input
              type="text"
              placeholder="Número"
              value={userData.numero}
              onChange={(e) =>
                setUserData({ ...userData, numero: e.target.value })
              }
            />
          </FormField>
          <FormField label="Complemento (opcional)">
            <Input
              type="text"
              placeholder="Complemento"
              value={userData.complemento || ''}
              onChange={(e) =>
                setUserData({ ...userData, complemento: e.target.value })
              }
            />
          </FormField>

          <div className="flex justify-center">
            <Button type="submit">Salvar</Button>
          </div>
        </form>

        {/* Exibição dos dados atualizados após a submissão */}
        {updatedUserData && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Usuário Atualizado:</h2>
            <p>
              <strong>ID:</strong> {updatedUserData.id}
            </p>
            <p>
              <strong>Nome:</strong> {updatedUserData.nome}
            </p>
            <p>
              <strong>CPF:</strong> {updatedUserData.cpf}
            </p>
            <p>
              <strong>Email:</strong> {updatedUserData.email}
            </p>
            <p>
              <strong>Telefone:</strong> {updatedUserData.telefone}
            </p>
            <p>
              <strong>CEP:</strong> {updatedUserData.cep}
            </p>
            <p>
              <strong>Logradouro:</strong> {updatedUserData.logradouro}
            </p>
            <p>
              <strong>Bairro:</strong> {updatedUserData.bairro}
            </p>
            <p>
              <strong>Cidade:</strong> {updatedUserData.cidade}
            </p>
            <p>
              <strong>Estado:</strong> {updatedUserData.estado}
            </p>
            <p>
              <strong>Número:</strong> {updatedUserData.numero}
            </p>
            <p>
              <strong>Complemento:</strong>{' '}
              {updatedUserData.complemento || 'Não informado'}
            </p>
            <p>
              <strong>Data de Criação:</strong> {updatedUserData.dataCriacao}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
