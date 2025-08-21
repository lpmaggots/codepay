'use client'

import Container from '@/shared/Container'
import Card from '@/shared/Card'
import Input from '@/shared/Input'
import Button from '@/shared/Button'
import BackToHome from '@/components/BackToHome'

import { api, useForm, zodResolver, toast } from '@/utils/useImportOnForm'
import { RegisterSchema, registerSchema } from '@/schemas/registerSchema'

import { API_ROUTES } from '@/constants/apiRoutes'

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting  }, reset } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await api.post(API_ROUTES.USERS.base, data)
      reset()
      toast.success('Cadastro realizado!!')
    } catch (error: any) {
      console.log(error.response?.data?.message || 'Erro ao cadastrar')
    }
  }

  return (
    <Container>
      <BackToHome />
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">Cadastre-se</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              name="name"
              label="Nome"
              placeholder="Seu nome completo"
              register={register}
              error={errors.name?.message}
            />
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="seu@email.com"
              register={register}
              error={errors.email?.message}
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              placeholder="Sua senha"
              register={register}
              error={errors.password?.message}
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              register={register}
              error={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isSubmitting}
            >
              Cadastrar
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  )
}