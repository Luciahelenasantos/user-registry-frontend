import { X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'destructive'
  onRemove?: () => void
}

export function Tag({
  className,
  variant = 'default',
  onRemove,
  children,
  ...props
}: TagProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="text-muted-foreground hover:text-foreground ml-2"
          aria-label="Remover tag"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

const variantClasses = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-success text-success-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
}
