import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    
    let name: string
    let phone: string
    let email: string | null = null
    let message: string | null = null
    let service: string | null = null
    
    // Обрабатываем как FormData, так и JSON
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      name = formData.get('name') as string
      phone = formData.get('phone') as string
      email = formData.get('email') as string || null
      message = formData.get('message') as string || null
      service = formData.get('service') as string || null
    } else {
      const body = await request.json()
      name = body.name
      phone = body.phone
      email = body.email || null
      message = body.message || null
      service = body.service || null
    }
    
    // Валидация
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' }, 
        { status: 400 }
      )
    }
    
    // Создаём заявку
    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        message: message?.trim() || null,
        service: service?.trim() || null
      }
    })
    
    console.log('[API] Contact submission created:', submission.id)
    
    // TODO: Отправить email уведомление
    
    // Редирект на страницу успеха (для форм) или JSON (для API)
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      return NextResponse.redirect(new URL('/contacts?success=true', request.url))
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Заявка успешно отправлена'
    }, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/contact error:', error)
    return NextResponse.json(
      { error: 'Ошибка отправки заявки' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit')
    
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    })
    
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('[API] GET /api/contact error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения заявок' }, 
      { status: 500 }
    )
  }
}
