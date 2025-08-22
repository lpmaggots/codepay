'use client'

import { useState } from 'react'

import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Button from '@/shared/Button'

import { useInstitutionTypes } from '@/hooks/useInstitutionTypesSWR'
import { useInstitutionsSWR } from '@/hooks/useInstitutionsSWR'
import { clear } from 'console'

interface Filters {
  name?: string
  code?: number
  typeId?: string
}

export default function TableInstitution() {
  const [ page, setPage ] = useState<number>(1)
  const [ perPage, setPerPage ] = useState<number>(10)
  const [ filters, setFilters ] = useState<Filters>({})

  const { data: types } = useInstitutionTypes()
  const { data } = useInstitutionsSWR(page, perPage, filters)

  const institutions = data?.data || []
  const meta = data?.meta

  const headers = ['Nome da Instituição', 'Tipo', 'ISPB', 'Código', 'Data de Criação']
  const perPageOptions = [
    { value: 10, description: '10' },
    { value: 25, description: '25' },
    { value: 50, description: '50' },
    { value: 100, description: '100' }
  ]

  const handleFilters = (field: keyof Filters, value: string | number) => {
    setPage(1)
    
    const parsedValue = value === '' || (typeof value === 'number' && isNaN(value)) ? undefined : value

    setFilters(prev => ({
      ...prev,
      [field]: parsedValue,
    }))
  }

  const clearFilters = () => {
    setPage(1)
    setFilters({})
  }
  
  const handlePagination = (action: 'prev' | 'next') => {
    if (action === 'prev' && page > 1) {
      setPage(prev => prev - 1)
    } else {
      setPage(prev => prev + 1)
    }
  }

  const handlePerPageChange = (value: number) => {
    setPerPage(value)
  }
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            onChange={(e) => handleFilters('name', e.target.value)}
            type="text"
            name="filterName"
            label="Nome"
            placeholder="Filtrar por nome"
            value={filters.name || ''}
          />
          <Input
            onChange={(e) => handleFilters('code', parseInt(e.target.value))}
            type="number"
            name="filterCode"
            label="Código"
            placeholder="Filtrar por código"
            value={filters.code || ''}
          />
          <Select
            onChange={(e) => handleFilters('typeId', e.target.value || '')}
            name="filterType"
            label="Tipo"
            hasPlaceholder
            value={filters.typeId || ''}
            options={(types || []).map(type => ({
              value: type.id,
              description: type.description
            }))}
          />
        </div>
        <div className="md:col-span-1 w-full flex items-end pb-2">
          <Button variant="secondary" className="w-full h-10.5" onClick={clearFilters} disabled={Object.keys(filters).length === 0}>
            Limpar Filtros
          </Button>
        </div>
      </section>
      <section className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {
                headers.map((header, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    {header}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {institutions.map((institution, index) => (
              <tr key={index}>              
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {institution.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {institution.type?.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {institution.ispb}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {institution.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {institution.createdAt ? new Date(institution.createdAt).toLocaleDateString('pt-BR') : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <nav
        className="flex items-center justify-between pt-4"
        aria-label="Pagination"
      >
        <div className="flex items-center gap-4">
          <Select
            onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
            name="pageSize"
            options={perPageOptions}
          />
          <div className="hidden sm:block">
            <p className="text-sm text-gray-700 font-medium">
              Mostrando <span>1</span> a{' '}
              <span>{perPage}</span> de{' '}
              <span>{meta?.count}</span> resultado(s)
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-x-2">
          <Button
            type="submit"
            onClick={() => handlePagination('prev')}
            variant="secondary"
            disabled={meta?.currentPage == 1}
          >
            Anterior
          </Button>
          <p className="text-sm text-gray-700 font-medium">
            Página <span>{meta?.currentPage}</span> de <span>{meta?.pageCount}</span>
          </p>
          <Button
            type="submit"
            onClick={() => handlePagination('next')}
            variant="secondary"
            disabled={meta?.currentPage == meta?.pageCount}
          >
            Próximo
          </Button>
        </div>
      </nav>
    </div>
  )
}