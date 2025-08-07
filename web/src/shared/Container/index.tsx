import { ReactNode } from 'react'

export default function Container({children}: { children: ReactNode}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-0">
      {children}
    </div>
  )
}
