import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE_NAME } from '@/lib/auth'

export async function POST() {
  try {
    const cookieStore = await cookies()
    
    // Удаляем cookie сессии
    cookieStore.set(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })
    
    console.log('[Auth] Logout successful')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Auth] Logout error:', error)
    return NextResponse.json(
      { error: 'Ошибка при выходе' }, 
      { status: 500 }
    )
  }
}

// GET метод для прямых переходов
export async function GET() {
  try {
    const cookieStore = await cookies()
    
    cookieStore.set(SESSION_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/'
    })
    
    return NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
  } catch (error) {
    console.error('[Auth] Logout error:', error)
    return NextResponse.redirect(new URL('/admin/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
  }
}
