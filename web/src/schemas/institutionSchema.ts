import { z } from 'zod'
import { institutionTypeSchema } from '@/schemas/InstitutionTypeSchema'

const websiteRx = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(\S*)?$/

export const institutionSchema = z.object({
  name: z.string().min(2, 'Precisa ter pelo menos 2 caracteres'),
  typeId: z.string().min(1, 'Selecione um tipo'),
  type: institutionTypeSchema.optional(),
  ispb: z.string().min(1, 'Precisa ter pelo menos 1 dígito'),
  code: z.string().min(1, 'Precisa ter pelo menos 1 dígito'),
  website: z.string().optional().or(z.literal(''))
    .refine((val) => {
      if (!val) return true
      return websiteRx.test(val)
    }, { message: 'URL inválida' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
})

export type InstitutionSchema = z.infer<typeof institutionSchema>