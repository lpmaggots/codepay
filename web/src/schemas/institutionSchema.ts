import { z } from 'zod'

export const institutionSchema = z.object({
  name: z.string().min(2, 'Precisa ter pelo menos 2 caracteres'),
  typeId: z.string().min(1, 'Selecione um tipo'),
  ispb: z.string().min(1, 'Precisa ter pelo menos 1 dígito'),
  code: z.string().min(1, 'Precisa ter pelo menos 1 dígito'),
  website: z.url({ message: 'URL inválida' }).optional().or(z.literal(''))
})

export type InstitutionSchema = z.infer<typeof institutionSchema>