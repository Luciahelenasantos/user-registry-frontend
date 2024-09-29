import { api } from '@/src/lib/axios'

export interface UserResponse {
  id: string
  nome: string
  cpf: string
  email: string
  telefone: string
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
  numero: string
  complemento?: string
}

export async function listarUsers(): Promise<UserResponse[]> {
  try {
    const response = await api.get<UserResponse[]>('/users')
    return response.data
  } catch (error) {
    console.error('Erro ao listar usuários:', error)
    throw error
  }
}
