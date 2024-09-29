import React, { ReactNode } from 'react'

import { Label } from '../../components/ui/label'

interface FormFieldProps {
  label: string
  children: ReactNode
  error?: string
  required?: boolean
  className?: string
}

export function FormField({
  label,
  children,
  error,
  required = false,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}
