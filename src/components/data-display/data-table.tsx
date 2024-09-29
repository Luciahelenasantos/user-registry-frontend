import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { Input } from '../../components/ui/input'
import { Pagination } from '../pagination'

interface DataTableProps<T> {
  data: T[]
  columns: Array<{
    header: string
    accessor: keyof T
    sortable?: boolean
    renderCell?: (row: T) => React.ReactNode // Permitir renderização personalizada
  }>
  rowsPerPage?: number
}

export function DataTable<T extends object>({
  data,
  columns,
  rowsPerPage = 10,
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = useMemo(() => {
    if (!sortField) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortField, sortOrder])

  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      columns.some((column) =>
        String(row[column.accessor])
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
    )
  }, [sortedData, searchTerm, columns])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [filteredData, currentPage, rowsPerPage])

  const handleSort = (accessor: keyof T) => {
    if (sortField === accessor) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(accessor)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <table className="w-full border-collapse bg-white shadow-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                onClick={() => column.sortable && handleSort(column.accessor)}
                className="cursor-pointer border-b p-4 text-left"
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && sortField === column.accessor && (
                    <span className="ml-2">
                      {sortOrder === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={String(column.accessor)} className="border-b p-4">
                  {column.renderCell
                    ? column.renderCell(row)
                    : String(row[column.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / rowsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
