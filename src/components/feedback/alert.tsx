import { AlertTriangleIcon, XCircleIcon } from 'lucide-react'
import React from 'react'

import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'

type AlertType = 'error' | 'warning'

interface AlertProps {
  type: AlertType
  title: string
  description: string
  onClose?: () => void
}

export function Alert({ type, title, description, onClose }: AlertProps) {
  const icon = {
    error: <XCircleIcon className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />,
  }

  return (
    <div
      className={cn('flex items-start rounded-md border p-4 shadow-sm', {
        'border-red-500 bg-red-50': type === 'error',
        'border-yellow-500 bg-yellow-50': type === 'warning',
      })}
    >
      <div className="flex-shrink-0">{icon[type]}</div>
      <div className="ml-3">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
        <div className="text-muted-foreground mt-2 text-sm">{description}</div>
      </div>
      {onClose && (
        <div className="ml-auto pl-3">
          <Button variant="ghost" size="icon" onClick={onClose} title="Fechar">
            <XCircleIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  )
}
