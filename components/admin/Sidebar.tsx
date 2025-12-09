'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SidebarProps {
  currentPath?: string
}

export default function Sidebar({ currentPath = '' }: SidebarProps) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return
    
    setLoggingOut(true)
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        // Используем window.location для полной перезагрузки
        window.location.href = '/admin/login'
      } else {
        console.error('Logout failed')
        setLoggingOut(false)
      }
    } catch (error) {
      console.error('Logout error:', error)
      setLoggingOut(false)
    }
  }

  const navItems = [
    { href: '/admin', label: 'Панель управления', exact: true },
    { href: '/admin/models', label: 'Модели' },
    { href: '/admin/categories', label: 'Категории' },
    { href: '/admin/blog', label: 'Блог' },
    { href: '/admin/services', label: 'Услуги' },
    { href: '/admin/portfolio', label: 'Портфолио' },
    { href: '/admin/contacts', label: 'Заявки' },
  ]

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return currentPath === href
    }
    return currentPath.startsWith(href)
  }

  return (
    <aside className="admin-sidebar">
      <h1>Klic me</h1>
      <nav>
        <ul className="admin-nav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={isActive(item.href, item.exact) ? 'active' : ''}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button 
              onClick={handleLogout}
              disabled={loggingOut}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white',
                cursor: loggingOut ? 'not-allowed' : 'pointer',
                padding: '10px 15px',
                width: '100%',
                textAlign: 'left',
                opacity: loggingOut ? 0.6 : 1,
                fontSize: '14px',
              }}
            >
              {loggingOut ? 'Выход...' : 'Выход'}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
