import Container from '@/shared/Container'
import Card from '@/shared/Card'
import AddTransaction from '@/components/AddTransaction'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if(!token) {
    redirect('/')
  }

  return (
    <>
      <Container className="pt-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Visão Geral</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Instituições Conectadas</h3>
              <p className="text-3xl font-bold text-purple-600">5</p>
            </Card>
            <Card>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Saldo Total</h3>
              <p className="text-3xl font-bold text-emerald-600">R$ 15.230,50</p>
            </Card>
            <Card>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Contas Ativas</h3>
              <p className="text-3xl font-bold text-blue-600">8</p>
            </Card>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Última Atualização</h2>
          <Card>
            <p className="text-gray-700">Dados atualizados em: <span className="font-medium">23 de Outubro de 2023, 14:30</span></p>
          </Card>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Movimentações</h2>
          <Card className="h-70 flex items-center justify-center text-gray-500">
            <p>Gráficos de movimentações e comparativos (em breve)</p>
          </Card>
        </section>
      </Container>
      <AddTransaction />
    </>
  )
}