import axios from 'axios'
import { useRouter } from 'next/router' // Mudando para useRouter
import React, { useState } from 'react'
import * as Yup from 'yup'

import { FormField } from '@/src/components/form/form-field'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'

import {
  criarUser,
  CriarUserRequest,
  CriarUserResponse,
} from '../../api/users/criarUser'
import { Alert } from '../../components/feedback/alert'
import { Toast } from '../../components/feedback/toast'
import { Loader } from '../../components/utilities/loader'

export function CriarUser() {
  const [userData, setUserData] = useState<CriarUserRequest>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    numero: '',
    complemento: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [createdUser, setCreatedUser] = useState<CriarUserResponse | null>(null)

  const router = useRouter() // Mudando para useRouter

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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    // Validação do formulário
    try {
      await schema.validate(userData, { abortEarly: false })
      const response = await criarUser(userData) // Recebe a resposta com endereço completo
      setCreatedUser(response)
      setSuccessMessage('Usuário criado com sucesso!')
      router.push('/users') // Mudando de navigate para router.push
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors.join(', '))
      } else if (axios.isAxiosError(error) && error.response?.data) {
        const backendMessage =
          typeof error.response.data === 'string'
            ? error.response.data
            : error.response.data.message || 'Erro desconhecido no servidor.'

        if (backendMessage.includes('CPF já cadastrado')) {
          setErrorMessage('Erro: O CPF já está cadastrado no sistema.')
        } else {
          setErrorMessage('Erro ao criar usuário: ' + backendMessage)
        }
      } else {
        setErrorMessage('Erro ao criar usuário.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      {errorMessage && (
        <Alert
          type="error"
          title="Erro"
          description={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
      {successMessage && (
        <Toast
          type="success"
          message={successMessage}
          duration={3000}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {/* Exibe os detalhes do usuário criado, incluindo o endereço */}
      {createdUser && (
        <Card className="mb-4 p-4">
          <h2 className="text-xl font-bold">Usuário Criado com Sucesso</h2>
          <p>
            <strong>Nome:</strong> {createdUser.nome}
          </p>
          <p>
            <strong>CPF:</strong> {createdUser.cpf}
          </p>
          <p>
            <strong>Email:</strong> {createdUser.email}
          </p>
          <p>
            <strong>Telefone:</strong> {createdUser.telefone}
          </p>
          <p>
            <strong>CEP:</strong> {createdUser.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {createdUser.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {createdUser.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {createdUser.cidade}
          </p>
          <p>
            <strong>Estado:</strong> {createdUser.estado}
          </p>
          <p>
            <strong>Número:</strong> {createdUser.numero}
          </p>
          <p>
            <strong>Complemento:</strong>{' '}
            {createdUser.complemento || 'Não informado'}
          </p>
          <p>
            <strong>Data de Criação:</strong> {createdUser.dataCriacao}
          </p>
        </Card>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField label="Nome">
          <Input
            type="text"
            placeholder="Nome"
            value={userData.nome}
            onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
          />
        </FormField>
        <FormField label="CPF">
          <Input
            type="text"
            placeholder="CPF"
            value={userData.cpf}
            onChange={(e) => setUserData({ ...userData, cpf: e.target.value })}
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
            onChange={(e) => setUserData({ ...userData, cep: e.target.value })}
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
            placeholder="Complemento (opcional)"
            value={userData.complemento || ''}
            onChange={(e) =>
              setUserData({ ...userData, complemento: e.target.value })
            }
          />
        </FormField>

        <div className="flex justify-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader size="small" /> : 'Criar Usuário'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CriarUser
