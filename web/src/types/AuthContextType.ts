import { UserType } from '@/types/UserType'

export type AuthContextType = {
  user: UserType | null
  token: string | null
  login: (token: string, user: UserType) => void
  logout: () => void
}