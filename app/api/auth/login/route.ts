import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyPassword, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' }, 
        { status: 400 }
      )
    }
    
    // Ищем пользователя
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })
    
    if (!user) {
      console.log('[Auth] Login failed: user not found for email:', email)
      return NextResponse.json(
        { error: 'Неверный email или пароль' }, 
        { status: 401 }
      )
    }
    
    // Проверяем пароль
    const isValid = await verifyPassword(password, user.passwordHash)
    
    if (!isValid) {
      console.log('[Auth] Login failed: invalid password for user:', email)
      return NextResponse.json(
        { error: 'Неверный email или пароль' }, 
        { status: 401 }
      )
    }
    
    // Устанавливаем cookie сессии
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE,
      path: '/'
    })
    
    console.log('[Auth] Login successful for user:', email)
    
    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('[Auth] Login error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера при входе' }, 
      { status: 500 }
    )
  }
}
