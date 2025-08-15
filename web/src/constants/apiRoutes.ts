export const API_ROUTES = {
  // MAIN
  AUTH: {
    login: '/api/auth/login'
  },
  ACCOUNTS: {
    base: '/api/accounts',
    byId: (id: string) => `/api/accounts/${id}`
  },
  DASHBOARD: {
    base: '/api/dashboard'
  },
  INSTITUTIONS: {
    base: '/api/institutions',
    byId: (id: string) => `/api/institutions/${id}`
  },
  TRANSACTIONS: {
    base: '/api/transactions',
    byId: (id: string) => `/api/transactions/${id}`
  },
  USERS: {
    base: '/api/users',
    byId: (id: string) => `/api/users/${id}`
  },
  // AUXILIARY
  ACCOUNT_TYPES: {
    base: '/api/account-types'
  },
  INSTITUTION_TYPES: {
    base: '/api/institution-types'
  },
  TRANSACTION_TYPES: {
    base: '/api/transaction-types'
  },
  TRANSACTION_CATEGORIES: {
    base: '/api/transaction-categories'
  }
}