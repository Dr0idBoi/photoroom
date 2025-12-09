import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type')
    const withModels = searchParams.get('withModels') === 'true'
    
    const where: Record<string, unknown> = {}
    
    if (type) {
      where.type = type
    }
    
    const categories = await prisma.category.findMany({
      where,
      include: withModels ? {
        models: {
          include: {
            images: { take: 1, orderBy: { order: 'asc' } }
          },
          take: 10
        }
      } : undefined,
      orderBy: { order: 'asc' }
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('[API] GET /api/categories error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения категорий' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация
    if (!body.name || !body.slug || !body.type) {
      return NextResponse.json(
        { error: 'Название, slug и тип обязательны' }, 
        { status: 400 }
      )
    }
    
    // Проверяем уникальность slug
    const existing = await prisma.category.findUnique({
      where: { slug: body.slug }
    })
    
    if (existing) {
      return NextResponse.json(
        { error: 'Категория с таким slug уже существует' }, 
        { status: 400 }
      )
    }
    
    const category = await prisma.category.create({
      data: {
        name: body.name.trim(),
        slug: body.slug.toLowerCase().trim(),
        description: body.description || null,
        type: body.type,
        order: body.order ? parseInt(body.order) : 0
      }
    })
    
    console.log('[API] Category created:', category.id)
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/categories error:', error)
    return NextResponse.json(
      { error: 'Ошибка создания категории' }, 
      { status: 500 }
    )
  }
}
