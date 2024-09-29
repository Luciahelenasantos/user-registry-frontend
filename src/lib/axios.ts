// src/lib/axios.ts
import axios from 'axios'

// Verifica a variável de ambiente para a URL da API, com um fallback para localhost:8080
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  withCredentials: true, // Permitir o envio de cookies ou tokens
})

// Adição de um interceptor para simular atraso nas requisições, se habilitado
if (process.env.NEXT_PUBLIC_ENABLE_API_DELAY === 'true') {
  api.interceptors.request.use(async (config) => {
    // Simula um atraso aleatório de até 4 segundos
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 4000)),
    )
    return config
  })
}

export default api
