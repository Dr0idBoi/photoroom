import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categorySlug = searchParams.get('category')
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    
    // Строим условия фильтрации
    const where: Record<string, unknown> = {}
    
    // Фильтр по статусу (по умолчанию только активные для публичного API)
    if (status) {
      where.status = status
    } else {
      where.status = 'active'
    }
    
    // Фильтр по категории
    if (categorySlug) {
      where.categories = {
        some: { slug: categorySlug }
      }
    }
    
    // Поиск по имени
    if (search) {
      where.name = {
        contains: search,
      }
    }
    
    const models = await prisma.model.findMany({
      where,
      include: {
        images: { 
          take: 1, 
          orderBy: { order: 'asc' } 
        },
        categories: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    })
    
    return NextResponse.json(models)
  } catch (error) {
    console.error('[API] GET /api/models error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения моделей' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация обязательных полей
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Имя и slug обязательны' }, 
        { status: 400 }
      )
    }
    
    // Проверяем уникальность slug
    const existing = await prisma.model.findUnique({
      where: { slug: body.slug }
    })
    
    if (existing) {
      return NextResponse.json(
        { error: 'Модель с таким slug уже существует' }, 
        { status: 400 }
      )
    }
    
    const model = await prisma.model.create({
      data: {
        name: body.name.trim(),
        slug: body.slug.toLowerCase().trim(),
        height: body.height ? parseInt(body.height) : null,
        bust: body.bust ? parseInt(body.bust) : null,
        waist: body.waist ? parseInt(body.waist) : null,
        hips: body.hips ? parseInt(body.hips) : null,
        shoeSize: body.shoeSize || null,
        hairColor: body.hairColor || null,
        skills: body.skills || null,
        status: body.status || 'active',
        categories: body.categoryIds?.length > 0 ? {
          connect: body.categoryIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        images: true,
        categories: true
      }
    })
    
    console.log('[API] Model created:', model.id)
    
    return NextResponse.json(model, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/models error:', error)
    return NextResponse.json(
      { error: 'Ошибка создания модели' }, 
      { status: 500 }
    )
  }
}
