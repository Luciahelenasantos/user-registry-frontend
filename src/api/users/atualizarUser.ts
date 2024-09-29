import { api } from '@/src/lib/axios'

// Interface para o request de atualização de usuário
export interface AtualizarUserRequest {
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

// Interface para a resposta do backend (dados completos do usuário)
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
  dataCriacao: string
}

// Função para atualizar o usuário e retornar os dados completos
export async function atualizarUser(
  id: string,
  data: AtualizarUserRequest,
): Promise<UserResponse> {
  try {
    const response = await api.put<UserResponse>(`/users/${id}`, data)
    return response.data // Retorna os dados completos do usuário atualizado
  } catch (error) {
    console.error(`Erro ao atualizar usuário com ID ${id}:`, error)
    throw error
  }
}
