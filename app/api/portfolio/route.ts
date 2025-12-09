import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceType = searchParams.get('serviceType')
    const limit = searchParams.get('limit')
    
    const where: Record<string, unknown> = {}
    
    if (serviceType) {
      where.serviceType = serviceType
    }
    
    const items = await prisma.portfolio.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit ? parseInt(limit) : undefined
    })
    
    return NextResponse.json(items)
  } catch (error) {
    console.error('[API] GET /api/portfolio error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения портфолио' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация
    if (!body.title) {
      return NextResponse.json(
        { error: 'Заголовок обязателен' }, 
        { status: 400 }
      )
    }
    
    const item = await prisma.portfolio.create({
      data: {
        title: body.title.trim(),
        description: body.description || null,
        images: body.images || null,
        serviceType: body.serviceType || null,
        date: body.date ? new Date(body.date) : new Date()
      }
    })
    
    console.log('[API] Portfolio item created:', item.id)
    
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/portfolio error:', error)
    return NextResponse.json(
      { error: 'Ошибка создания работы' }, 
      { status: 500 }
    )
  }
}
