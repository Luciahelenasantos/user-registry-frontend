import { api } from '@/src/lib/axios'

export async function deletarUser(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`)
    console.log(`Usuário com ID ${id} deletado com sucesso.`)
  } catch (error) {
    console.error(`Erro ao deletar usuário com ID ${id}:`, error)
    throw error
  }
}
