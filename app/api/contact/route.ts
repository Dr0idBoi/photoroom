import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData()
    
    const submission = await prisma.contactSubmission.create({
      data: {
        name: body.get('name') as string,
        phone: body.get('phone') as string,
        email: body.get('email') as string || '',
        message: body.get('message') as string || '',
        service: body.get('service') as string || ''
      }
    })
    
    // In production, you would send an email notification here
    
    return NextResponse.redirect(new URL('/contacts?success=true', request.url))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}



