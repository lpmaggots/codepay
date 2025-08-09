import { FiChevronLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function BackToHome() {
  return (
    <div className="mt-10">
      <Link href="/" passHref className="text-gray-600 hover:text-gray-900 flex items-center">
        <FiChevronLeft className="mr-2 inline" />
        Voltar à Home
      </Link>
    </div>
  )
}