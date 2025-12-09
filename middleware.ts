import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Защищённые пути админ-панели
const PROTECTED_PATHS = [
  '/admin',
  '/admin/models',
  '/admin/categories',
  '/admin/blog',
  '/admin/services',
  '/admin/portfolio',
  '/admin/contacts',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Проверяем, является ли путь защищённым
  const isProtectedPath = PROTECTED_PATHS.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  )
  
  // Пропускаем страницу логина
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')
    
    // Если пользователь уже залогинен, редиректим на админку
    if (sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    return NextResponse.next()
  }
  
  // Защита админ-роутов
  if (isProtectedPath) {
    const sessionCookie = request.cookies.get('admin_session')
    
    if (!sessionCookie?.value) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}

