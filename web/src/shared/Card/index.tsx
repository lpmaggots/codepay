import { ReactNode } from 'react'

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-gray-300/70 p-4 rounded-lg gap-2 hover:bg-gray-300/80 transition duration-300">
      {children}
    </div>
  )
}