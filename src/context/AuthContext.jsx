import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@123'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'pass@123'

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true'
  })

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      sessionStorage.setItem('isAdmin', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    sessionStorage.removeItem('isAdmin')
  }

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
