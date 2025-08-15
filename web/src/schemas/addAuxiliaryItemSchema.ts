import { z } from 'zod'

export const addAuxiliaryItemSchema = z.object({
  description: z.string().min(2, 'Precisa ter pelo menos 2 caracteres')
})

export type AddAuxiliaryItemSchema = z.infer<typeof addAuxiliaryItemSchema>
