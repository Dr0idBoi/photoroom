import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function checkAuth() {
  const sessionId = cookies().get('admin_session')?.value
  
  if (!sessionId) {
    redirect('/admin/login')
  }
  
  const user = await prisma.user.findUnique({
    where: { id: sessionId }
  })
  
  if (!user) {
    cookies().delete('admin_session')
    redirect('/admin/login')
  }
  
  return user
}



