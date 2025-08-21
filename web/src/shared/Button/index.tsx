import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'floating' | 'link'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  className?: string
}

export default function Button({ children, variant = 'primary', disabled, className, ...props }: ButtonProps) {
  const baseClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transition-all duration-300 ease-in-out'

  const variantClasses = {
    primary: 'py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 border-transparent',
    secondary: 'py-2 px-4 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 border border-gray-300',
    floating: 'fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg focus:ring-blue-500 transform hover:scale-110 text-lg font-semibold',
    link: 'text-blue-600 hover:text-blue-800 text-xs font-medium',
  }

  return (
    <button
      className={clsx(baseClasses, className, variantClasses[variant], disabled && 'opacity-50 pointer-events-none')}
      {...props}
    >
      {children}
    </button>
  )
}
