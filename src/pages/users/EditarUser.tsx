// src/pages/User/EditarUser.tsx
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import { FormField } from '@/src/components/form/form-field'
import { Button } from '@/src/components/ui/button'
import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'

import {
  atualizarUser,
  AtualizarUserRequest,
} from '../../api/users/atualizarUser'
import { buscarUserPorId } from '../../api/users/buscarUserPorId'
import { Alert } from '../../components/feedback/alert'
import { Toast } from '../../components/feedback/toast'
import { Loader } from '../../components/utilities/loader'

export function EditarUser() {
  const router = useRouter()
  const { id } = router.query // Pega o id da URL

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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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

  useEffect(() => {
    // Carrega os dados do usuário ao montar a página
    async function fetchUser() {
      if (id) {
        try {
          const user = await buscarUserPorId(id as string) // Confirma que `id` é uma string
          setUserData(user)
        } catch (error) {
          console.error('Erro ao buscar usuário:', error)
          setErrorMessage('Erro ao carregar dados do usuário.')
        }
      }
    }
    fetchUser()
  }, [id])

  // Função para atualizar os dados do usuário
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    // Validação do formulário
    try {
      await schema.validate(userData, { abortEarly: false }) // Valida os dados com Yup
      await atualizarUser(id as string, userData)
      setSuccessMessage('Usuário atualizado com sucesso!')
      router.push('/users') // Redireciona para a lista de usuários
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrorMessage(error.errors.join(', '))
      } else if (axios.isAxiosError(error) && error.response?.data) {
        // Captura o erro enviado pelo backend
        const backendMessage =
          typeof error.response.data === 'string'
            ? error.response.data
            : error.response.data.message || 'Erro desconhecido no servidor.'

        if (backendMessage.includes('CPF já cadastrado')) {
          setErrorMessage('Erro: O CPF já está cadastrado no sistema.')
        } else {
          setErrorMessage('Erro ao atualizar usuário: ' + backendMessage)
        }
      } else {
        setErrorMessage('Erro ao atualizar usuário.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-semibold">Editar Usuário</h1>
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

      <Card className="p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              placeholder="Complemento (opcional)"
              value={userData.complemento || ''}
              onChange={(e) =>
                setUserData({ ...userData, complemento: e.target.value })
              }
            />
          </FormField>

          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader size="small" /> : 'Salvar'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default EditarUser
