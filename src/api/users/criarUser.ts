import { api } from '@/src/lib/axios'

export interface CriarUserRequest {
  nome: string
  cpf: string
  email: string
  telefone: string
  cep: string
  numero: string
  complemento?: string
}

export interface CriarUserResponse {
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
  dataCriacao: string
}

export async function criarUser(
  data: CriarUserRequest,
): Promise<CriarUserResponse> {
  try {
    const response = await api.post<CriarUserResponse>('/users', data)
    return response.data
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}
