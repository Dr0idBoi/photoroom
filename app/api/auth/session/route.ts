import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sessionId = cookies().get('admin_session')?.value
    
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
      cookies().delete('admin_session')
      return NextResponse.json({ user: null })
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}



