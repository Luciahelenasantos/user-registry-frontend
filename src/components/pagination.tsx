import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

import { Button } from '../components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  return (
    <div className="flex items-center justify-between">
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoBack}
        className="p-2"
        title="Página Anterior"
        aria-label="Página Anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoForward}
        className="p-2"
        title="Próxima Página"
        aria-label="Próxima Página"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
