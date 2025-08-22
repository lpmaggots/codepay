'use client'

import useSWR from 'swr'
import { API_ROUTES, fetcher } from '@/utils/useImportOnSWR'
import { DashboardType } from '@/types/DashboardType'

export function useDashboardSWR(initialData?: DashboardType | null) {
  return useSWR<DashboardType>(
    API_ROUTES.DASHBOARD,
    fetcher,
    {
      fallbackData: initialData ?? undefined,
      revalidateOnFocus: true,
    }
  )
}
