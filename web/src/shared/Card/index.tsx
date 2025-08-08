import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode,
  className?: string,
}


export default function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 ${className}`}>
      {children}
    </div>
  )
}