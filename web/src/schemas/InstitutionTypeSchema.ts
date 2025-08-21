import { z } from 'zod'

export const institutionTypeSchema = z.object({
  id: z.number(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type InstitutionTypesSchema = z.infer<typeof institutionTypeSchema>