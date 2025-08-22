'use client'

import useSWR from 'swr'
import { API_ROUTES, fetcher } from '@/utils/useImportOnSWR'
import { InstitutionSchema } from '@/schemas/institutionSchema'
import { MetaType } from '@/types/metaType'

export function useInstitutionsSWR(
  page: number,
  perPage: number,
  filters: Record<string, any> = {}
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(perPage),
    ...Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
    )
  })
  return useSWR<{ data: InstitutionSchema[], meta: MetaType }>(
    `${API_ROUTES.INSTITUTIONS.base}?${params.toString()}`,
    fetcher
  )
}