import Container from '@/shared/Container'
import Card from '@/shared/Card'
import AddTransaction from '@/components/AddTransaction'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { serverApi } from '@/lib/serverApi'
import { DashboardType } from '@/types/DashboardType'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value  

  if (!token) {
    redirect('/')
  }

  let data: DashboardType | null = null
  try {
    const api = serverApi(token!)
    const res = await api.get('/dashboard')
    data = res.data
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
      .toLocaleString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    
    return date
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
              <p className="text-3xl font-bold text-purple-600">{data?.institutionsConnected}</p>
            </Card>
            <Card>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Saldo Total</h3>
              <p className="text-3xl font-bold text-emerald-600">
                {data?.totalBalance
                  ? data.totalBalance.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : 'R$ 0,00'}
              </p>
            </Card>
            <Card>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Contas Ativas</h3>
              <p className="text-3xl font-bold text-blue-600">{data?.activeAccounts}</p>
            </Card>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Última Atualização</h2>
          <Card>
            <p className="text-gray-700">
              Dados atualizados em:&nbsp;
              <span className="font-bold">
                {data?.lastUpdatedAt && formatDate(data.lastUpdatedAt) }
              </span>
            </p>
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