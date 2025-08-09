'use client'

import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/images/codepay-logo.png'
import { FiLogIn, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi'

import { useRouter } from 'next/navigation'

import Button from '@/shared/Button'

import { useState } from 'react'
import { useAuth } from '@/providers/AuthContext'

export default function Navbar() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()


  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Contas', href: '/account' },
    { label: 'Instituições', href: '/institution' },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="w-full bg-white shadow-sm shadow-gray-300">
      <div className="flex items-center justify-between h-20 px-2 md:px-0 max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src={Logo}
            alt="CodePay logo"
            quality={100}
            width={100}
            height={100}
          />
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 mt-2 cursor-pointer">
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {
            user && (
              <section className="flex space-x-2">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="py-2 px-3 hover:text-purple-700 transition"
                  >
                    {label}
                  </Link>
                ))}
              </section>   
            )
          }
          {
            user ? (
              <Button
                onClick={handleLogout}
                variant="secondary"
              >
                Sair
                <FiLogOut className="inline ml-2" />
              </Button>
            ) : (
              <Link
                href="/login"
                className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition flex items-center justify-center cursor-pointer"
              >
                Login
                <FiLogIn className="inline ml-2" />
              </Link>
            )
          }
          <Link
            href="/register"
            className="min-w-[145px] bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition cursor-pointer"
          >
            Cadastre-se
            <FiUser className="inline ml-2" />
          </Link>
        </div>
      </div>

      {/* Mobile */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {
            user && (
              navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block py-2 px-3 hover:text-purple-700 transition"
                >
                  {label}
                </Link>
              ))
            )
          }
          {
            user ? (
              <Button
                onClick={handleLogout}
                variant="secondary"
              >
                Sair
                <FiLogOut className="inline ml-2" />
              </Button>
            ) : (
              <Link
                href="/login"
                className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition flex items-center justify-center cursor-pointer"
              >
                Login
                <FiLogIn className="inline ml-2" />
              </Link>
            )
          }
          <Link
            href="/register"
            className="block w-full text-center bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition cursor-pointer"
          >
            Cadastre-se
            <FiUser className="inline ml-2" />
          </Link>
        </div>
      )}
    </nav>
  )
}
