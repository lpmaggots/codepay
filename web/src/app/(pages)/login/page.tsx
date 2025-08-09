'use client'

import Container from '@/shared/Container'
import Card from '@/shared/Card'
import Input from '@/shared/Input'
import Button from '@/shared/Button'
import BackToHome from '@/components/BackToHome'

import { useRouter } from 'next/navigation'

import { api } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, loginSchema } from '@/schemas/loginSchema'
import { toast } from 'react-toastify'
import { useAuth } from '@/providers/AuthContext'

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()

  const { register, handleSubmit, formState: { errors, isSubmitting }  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await api.post('auth/login', data)
      if (response) {
        const { access_token, user } = response.data
        login(access_token, user)
        toast.success('Login realizado!!')
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.log(error.response?.data?.message || 'Erro ao fazer login')
      toast.error('Usaário ou senha inválidos')
    }
  }

  return (
    <Container>
      <BackToHome />
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">Acesse sua conta</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" variant="primary" className={`w-full ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  )
}