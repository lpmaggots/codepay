import Link from 'next/link'
import Container from '@/shared/Container'
import Card from '@/shared/Card'
import Button from '@/shared/Button'
import PageHeader from '@/components/PageHeader'
import AddAccount from '@/components/AddAccount'

export default function Account() {
  return (
    <Container className="pt-10">
      <PageHeader
        title="Contas"
        subtitle="Minhas Contas"
      >
        <AddAccount />
      </PageHeader>
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Banco do Brasil</h3>
            <p className="text-gray-700 mb-2">Contas Conectadas: <span className="font-medium">3</span></p>
            <p className="text-gray-700 mb-4">Última Sincronização: <span className="font-medium">23/10/2023</span></p>
            <Button variant="primary">Ver Detalhes</Button>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">NuBank</h3>
            <p className="text-gray-700 mb-2">Contas Conectadas: <span className="font-medium">2</span></p>
            <p className="text-gray-700 mb-4">Última Sincronização: <span className="font-medium">22/10/2023</span></p>
            <Button variant="primary">Ver Detalhes</Button>
          </Card>
          <Card>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Itaú</h3>
            <p className="text-gray-700 mb-2">Contas Conectadas: <span className="font-medium">1</span></p>
            <p className="text-gray-700 mb-4">Última Sincronização: <span className="font-medium">21/10/2023</span></p>
            <Button variant="primary">Ver Detalhes</Button>
          </Card>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Adicionar Nova Instituição</h2>
        <Card>
          <p className="text-lg text-gray-700 mb-7">Conecte-se a novas instituições financeiras para gerenciar todas as suas contas em um só lugar.</p>
          <Link href="/institution" className="py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Conectar Instituição
          </Link>
        </Card>
      </section>
    </Container>
  )
}