import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE_NAME } from '@/lib/auth'

export interface AuthUser {
  id: string
  email: string
  role: string
}

/**
 * Проверка аутентификации для серверных компонентов
 * Возвращает пользователя или редиректит на страницу логина
 */
export async function checkAuth(): Promise<AuthUser> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (!sessionId) {
    redirect('/admin/login')
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        email: true,
        role: true
      }
    })
    
    if (!user) {
      redirect('/admin/login')
    }
    
    return user
  } catch (error) {
    console.error('[Auth] Check auth error:', error)
    redirect('/admin/login')
  }
}

/**
 * Получение текущего пользователя без редиректа
 * Возвращает пользователя или null
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (!sessionId) {
    return null
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        email: true,
        role: true
      }
    })
    
    return user
  } catch (error) {
    console.error('[Auth] Get current user error:', error)
    return null
  }
}
