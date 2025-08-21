export const API_ROUTES = {
  // MAIN
  AUTH: {
    login: '/auth/login'
  },
  ACCOUNTS: {
    base: '/accounts',
    byId: (id: string) => `/api/accounts/${id}`
  },
  DASHBOARD: {
    base: '/dashboard'
  },
  INSTITUTIONS: {
    base: '/institutions',
    byId: (id: string) => `/api/institutions/${id}`
  },
  TRANSACTIONS: {
    base: '/transactions',
    byId: (id: string) => `/api/transactions/${id}`
  },
  USERS: {
    base: '/users',
    byId: (id: string) => `/api/users/${id}`
  },
  // AUXILIARY
  ACCOUNT_TYPES: {
    base: '/account-types'
  },
  INSTITUTION_TYPES: {
    base: '/institution-types'
  },
  TRANSACTION_TYPES: {
    base: '/transaction-types'
  },
  TRANSACTION_CATEGORIES: {
    base: '/transaction-categories'
  }
}