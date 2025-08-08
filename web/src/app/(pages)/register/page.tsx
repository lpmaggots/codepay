import Container from '@/shared/Container'
import Card from '@/shared/Card'
import Input from '@/shared/Input'
import Button from '@/shared/Button'

export default function Register() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[calc(100vh-90px)]">
        <Card className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">Cadastre-se</h2>
          <form className="space-y-4">
            <Input
              type="text"
              name="name"
              label="Nome"
              placeholder="Seu nome completo"
            />
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="seu@email.com"
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              placeholder="Sua senha"
            />
            <Input
              type="password"
              name="confirmPassword"
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
            />
            <Button type="submit" variant="primary" className="w-full">
              Cadastrar
            </Button>
          </form>
        </Card>
      </div>
    </Container>
  )
}