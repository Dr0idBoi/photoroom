import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function checkAuth() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get('admin_session')?.value
  
  if (!sessionId) {
    redirect('/admin/login')
  }
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionId }
    })
    
    if (!user) {
      // Просто редирект без удаления куки (куки будут перезаписаны при следующем логине)
      redirect('/admin/login')
    }
    
    return user
  } catch (error) {
    console.error('Auth check error:', error)
    redirect('/admin/login')
  }
}



