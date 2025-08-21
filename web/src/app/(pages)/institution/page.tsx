import Container from '@/shared/Container'
import PageHeader from '@/components/PageHeader'
import TableInstitution from '@/components/TableInstitution'
import AddInstitution from '@/components/AddInstitution'
import AddTransaction from '@/components/AddTransaction'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Institution() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if(!token) {
    redirect('/')
  }

  return (
    <>
      <Container className="pt-10">
        <PageHeader
          title="Instituições Financeiras"
          subtitle="Listagem de Instituições"
        >
          <AddInstitution />
        </PageHeader>
        <section className="mb-8">
          <TableInstitution />
        </section>
      </Container>
      <AddTransaction />
    </>
  )
}