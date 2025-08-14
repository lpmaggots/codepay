'use client'

import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/assets/images/hero.png'
import { FaLock, FaCog, FaChartBar, FaArrowRight } from 'react-icons/fa'
import Container from '@/shared/Container'
import AddTransaction from '@/components/AddTransaction'

const benefits = [
  {
    icon: <FaLock className="text-purple-600 text-xl" />,
    label: 'Seguro',
  },
  {
    icon: <FaChartBar className="text-blue-600 text-xl" />,
    label: 'Transparente',
  },
  {
    icon: <FaCog className="text-emerald-500 text-xl" />,
    label: 'Automatizado',
  },
]

export default function Home() {
  return (
    <>
      <Container>
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-90px)] px-4">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-10">
            <section className="w-full md:w-1/2 text-center md:text-left pt-0 md:pt-8">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                Gerencie suas finanças com liberdade
              </h1>
              <p className="text-base md:text-lg mb-6 text-gray-700">
                Suas contas bancárias em um só lugar, com segurança e autonomia. <br />
                Com o <strong>CodePay</strong>, você visualiza saldos, transações e gerencia suas instituições financeiras de forma inteligente e centralizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {benefits.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 flex-1 p-4 bg-gray-100 shadow-lg border border-gray-200 rounded-lg justify-center sm:justify-start"
                  >
                    {icon}
                    <span className="text-gray-800 font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-2 py-3 rounded-md text-lg font-medium text-purple-700 hover:text-purple-800 transition duration-200"
              >
                Comece agora
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </section>
            <section className="w-full md:w-1/2 flex justify-center">
              <Image
                src={Hero}
                alt="Hero Image"
                quality={100}
                priority
                className="w-full max-w-[700px] h-auto"
              />
            </section>
          </div>
        </main>
      </Container>
    <AddTransaction />
    </>
  )
}
