import axios from 'axios'
import { AlertCircleIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form' // Importando useForm e SubmitHandler

import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  type: ToastType
  message: string
  duration?: number // Duração em milissegundos
  onClose?: () => void
}

export function Toast({ type, message, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) {
        onClose() // Agora chamando a função diretamente
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const icon = {
    success: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
    error: <XCircleIcon className="h-5 w-5 text-red-500" />,
    warning: <AlertCircleIcon className="h-5 w-5 text-yellow-500" />,
    info: <AlertCircleIcon className="h-5 w-5 text-blue-500" />,
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center space-x-3 rounded-md border p-4 shadow-lg transition-transform duration-300 ease-in-out',
        {
          'border-green-500 bg-green-50': type === 'success',
          'border-red-500 bg-red-50': type === 'error',
          'border-yellow-500 bg-yellow-50': type === 'warning',
          'border-blue-500 bg-blue-50': type === 'info',
        },
      )}
    >
      {icon[type]}
      <span className="text-sm font-medium">{message}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible(false)}
        title="Fechar"
      >
        <XCircleIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}

interface FormData {
  nomeUsuario: string
}

const FormularioUsuario: React.FC = () => {
  const [toast, setToast] = useState<{
    type: ToastType
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post('/usuarios/cadastrar', data)
      setToast({
        type: 'success',
        message: 'Usuário cadastrado com sucesso!',
      })
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      setToast({
        type: 'error',
        message: 'Erro ao cadastrar usuário. Tente novamente.',
      })
    }
  }

  return (
    <div>
      {/* Renderizar o Toast se ele estiver visível */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Formulário de Cadastro de Usuário */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome do Usuário</label>
          <input
            type="text"
            {...register('nomeUsuario', { required: 'Nome é obrigatório' })}
          />
          {errors.nomeUsuario && <p>{errors.nomeUsuario.message}</p>}
        </div>
        <Button type="submit">Cadastrar Usuário</Button>
      </form>
    </div>
  )
}

export default FormularioUsuario
