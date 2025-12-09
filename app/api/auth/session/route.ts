import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { SESSION_COOKIE_NAME } from '@/lib/auth'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value
    
    if (!sessionId) {
      return NextResponse.json({ user: null })
    }
    
    const user = await prisma.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        email: true,
        role: true
      }
    })
    
    if (!user) {
      // Очищаем невалидную сессию
      cookieStore.set(SESSION_COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/'
      })
      return NextResponse.json({ user: null })
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    console.error('[Auth] Session check error:', error)
    return NextResponse.json({ user: null })
  }
}
