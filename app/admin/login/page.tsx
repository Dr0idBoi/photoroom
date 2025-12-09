'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Компонент формы логина
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  // Получаем URL для редиректа после логина
  const redirectTo = searchParams.get('redirect') || '/admin'

  useEffect(() => {
    // Проверяем, не залогинен ли уже пользователь
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      
      if (data.user) {
        window.location.href = redirectTo
      }
    } catch (err) {
      // Игнорируем ошибки проверки сессии
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(), 
          password 
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Ошибка входа')
        setLoading(false)
        return
      }

      // Успешный вход - используем window.location для полной перезагрузки
      window.location.href = redirectTo
    } catch (err) {
      console.error('Login error:', err)
      setError('Ошибка соединения с сервером')
      setLoading(false)
    }
  }

  return (
    <div className="login-box">
      <h1>Вход в админ панель</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Photoroom
      </p>
      
      {error && (
        <div style={{ 
          padding: '12px 16px', 
          background: '#fee2e2', 
          color: '#dc2626',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@getmodels.local"
            required
            autoComplete="email"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />
        </div>

        <button 
          type="submit" 
          className="btn-admin" 
          style={{ width: '100%', marginTop: '10px' }} 
          disabled={loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '20px', 
        fontSize: '12px', 
        color: '#999' 
      }}>
        По умолчанию: admin@getmodels.local / admin123
      </p>
    </div>
  )
}

// Fallback для Suspense
function LoginFormFallback() {
  return (
    <div className="login-box">
      <h1>Вход в админ панель</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Photoroom
      </p>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        Загрузка...
      </div>
    </div>
  )
}

// Главный компонент страницы
export default function AdminLoginPage() {
  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="login-container">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </>
  )
}
