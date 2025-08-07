import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/images/codepay-logo.png'
import { FiLogIn } from 'react-icons/fi'

export default function Navbar() {
  return (
    <nav className="w-full flex items-center py-2 px-2 h-22 shadow-sm shadow-gray-300">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/">
          <Image
            src={Logo}
            alt="CodePay logo"
            quality={100}
            width={100}
            height={100}
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/account"
            className="py-2 px-4 rounded hover:bg-gray-300 duration-200 transition cursor-pointer"
          >
            Contas
          </Link>
          <Link
            href="/institution"
            className="py-2 px-4 rounded hover:bg-gray-300 duration-200 transition cursor-pointer"
          >
            Instituições
          </Link>
          <button
            type="button"
            className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 duration-200 transition cursor-pointer"
          >
            Login
            <FiLogIn className="inline ml-2" />
          </button>
        </div>
      </div>
    </nav>
  )
}