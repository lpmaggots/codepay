import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3, 'Precisa ter pelo menos 3 caracteres'),
  email: z.email('Email inválido'),
  password: z.string().min(6, 'Precisa ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string()
    .min(6, 'Precisa ter pelo menos 6 caracteres')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas precisam ser iguais',
  path: ['confirmPassword']
})

export type RegisterSchema = z.infer<typeof registerSchema>