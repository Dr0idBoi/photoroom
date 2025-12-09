import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryGroup = searchParams.get('categoryGroup')
    const limit = searchParams.get('limit')
    
    const where: Record<string, unknown> = {}
    
    if (categoryGroup) {
      where.categoryGroup = categoryGroup
    }
    
    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
      take: limit ? parseInt(limit) : undefined
    })
    
    return NextResponse.json(services)
  } catch (error) {
    console.error('[API] GET /api/services error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения услуг' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Название и slug обязательны' }, 
        { status: 400 }
      )
    }
    
    // Проверяем уникальность slug
    const existing = await prisma.service.findUnique({
      where: { slug: body.slug }
    })
    
    if (existing) {
      return NextResponse.json(
        { error: 'Услуга с таким slug уже существует' }, 
        { status: 400 }
      )
    }
    
    const service = await prisma.service.create({
      data: {
        name: body.name.trim(),
        slug: body.slug.toLowerCase().trim(),
        description: body.description || null,
        content: body.content || null,
        priceInfo: body.priceInfo || null,
        categoryGroup: body.categoryGroup || null,
        images: body.images || null,
        order: body.order ? parseInt(body.order) : 0
      }
    })
    
    console.log('[API] Service created:', service.id)
    
    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/services error:', error)
    return NextResponse.json(
      { error: 'Ошибка создания услуги' }, 
      { status: 500 }
    )
  }
}
