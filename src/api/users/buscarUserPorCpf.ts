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

export async function buscarUserPorCpf(cpf: string): Promise<UserResponse> {
  try {
    const response = await api.get<UserResponse>(`/users/cpf/${cpf}`)
    return response.data
  } catch (error) {
    console.error(`Erro ao buscar usuário por CPF ${cpf}:`, error)
    throw error
  }
}
