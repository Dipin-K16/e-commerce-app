import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'

import Navbar from './components/Navbar'
import ThemeProviderWrapper from './theme/ThemeContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const hasVisitedLogin = localStorage.getItem('hasVisitedLogin')
      setIsAuthenticated(!!hasVisitedLogin)
    }
    
    checkAuth()
    
    window.addEventListener('storage', checkAuth)
    window.addEventListener('authChange', checkAuth)
    
    return () => {
      window.removeEventListener('storage', checkAuth)
      window.removeEventListener('authChange', checkAuth)
    }
  }, [])

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/products" replace/> } />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  )
}

export default App
