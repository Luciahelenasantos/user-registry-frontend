import * as React from 'react'

interface DetailItem {
  label: string
  value: React.ReactNode
}

interface DetailViewProps {
  details: DetailItem[]
}

export function DetailView({ details }: DetailViewProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Detalhes</h2>
      <dl className="space-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <dt className="font-medium text-gray-700">{detail.label}</dt>
            <dd className="text-gray-900">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
