import Container from '@/shared/Container'
import PageHeader from '@/components/PageHeader'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import Button from '@/shared/Button'
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
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* <Input
                type="text"
                name="filterName"
                label="Nome"
                placeholder="Filtrar por nome"
              />
              <Input
                type="text"
                name="filterCode"
                label="Código"
                placeholder="Filtrar por código"
              />
              <Select
                name="filterType"
                label="Tipo"
                options={[
                  { value: '', label: 'Todos' },
                  { value: 'Banco', label: 'Banco' },
                  { value: 'Financeira', label: 'Financeira' },
                ]}
              /> */}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Nome da Instituição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Banco do Brasil
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      001
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Banco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      Ativo
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      NuBank
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      260
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Banco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      Ativo
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Itaú Unibanco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      341
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Banco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      Ativo
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Caixa Econômica Federal
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      104
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Banco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      Ativo
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Bradesco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      237
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Banco
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      Ativo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav
              className="flex items-center justify-between pt-4"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">1</span> a{' '}
                  <span className="font-medium">5</span> de{' '}
                  <span className="font-medium">50</span> resultados
                </p>
              </div>
              <div className="flex-1 flex justify-end gap-x-2">
                <Button variant="secondary">
                  Anterior
                </Button>
                <Button variant="secondary">
                  Próximo
                </Button>
              </div>
            </nav>
          </div>
        </section>
      </Container>
      <AddTransaction />
    </>
  )
}