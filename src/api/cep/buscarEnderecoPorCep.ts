import { api } from '@/src/lib/axios'

export interface EnderecoResponse {
  cep: string
  logradouro: string
  complemento?: string
  bairro: string
  localidade: string
  uf: string
  ibge?: string
  gia?: string
  ddd?: string
  siafi?: string
}

export async function buscarEnderecoPorCep(
  cep: string,
): Promise<EnderecoResponse> {
  try {
    const response = await api.get<EnderecoResponse>(`/cep/${cep}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar o endereço pelo CEP:', error)
    throw error
  }
}
