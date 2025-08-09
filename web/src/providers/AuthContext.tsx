'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AuthContextType } from '@/types/AuthContextType'
import { User } from '@/types/User'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = Cookies.get('token')
    const storedUser = Cookies.get('user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        Cookies.remove('user')
        setUser(null)
      }
    }
  }, [])

  const login = (token: string, user: User) => {
    Cookies.set('token', token, { expires: 7 })
    Cookies.set('user', JSON.stringify(user), { expires: 7 })
    setToken(token)
    setUser(user)
  }

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}