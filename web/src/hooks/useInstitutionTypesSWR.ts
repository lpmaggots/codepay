import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { API_ROUTES } from '@/constants/apiRoutes'
import { InstitutionTypes } from '@/types/InstitutionType'

export function useInstitutionTypes() {
  return useSWR<InstitutionTypes[]>(API_ROUTES.INSTITUTION_TYPES.base, fetcher)
}