'use client'

import useSWR from 'swr'
import { API_ROUTES, fetcher } from '@/utils/useImportOnSWR'
import { InstitutionTypes } from '@/types/InstitutionType'

export function useInstitutionTypes() {
  return useSWR<InstitutionTypes[]>(API_ROUTES.INSTITUTION_TYPES.base, fetcher)
}