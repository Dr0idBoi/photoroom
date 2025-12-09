import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    
    // Пробуем найти по ID или по slug
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      },
      include: {
        models: {
          include: {
            images: { take: 1, orderBy: { order: 'asc' } }
          }
        }
      }
    })
    
    if (!category) {
      return NextResponse.json(
        { error: 'Категория не найдена' }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('[API] GET /api/categories/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения категории' }, 
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Проверяем существование
    const existing = await prisma.category.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Категория не найдена' }, 
        { status: 404 }
      )
    }
    
    // Проверяем уникальность slug
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: body.slug }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Категория с таким slug уже существует' }, 
          { status: 400 }
        )
      }
    }
    
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        slug: body.slug?.toLowerCase().trim(),
        description: body.description !== undefined ? body.description : undefined,
        type: body.type,
        order: body.order !== undefined ? parseInt(body.order) : undefined
      }
    })
    
    console.log('[API] Category updated:', id)
    
    return NextResponse.json(category)
  } catch (error) {
    console.error('[API] PUT /api/categories/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка обновления категории' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    
    const existing = await prisma.category.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Категория не найдена' }, 
        { status: 404 }
      )
    }
    
    await prisma.category.delete({
      where: { id }
    })
    
    console.log('[API] Category deleted:', id)
    
    return NextResponse.json({ 
      success: true,
      message: 'Категория успешно удалена' 
    })
  } catch (error) {
    console.error('[API] DELETE /api/categories/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка удаления категории' }, 
      { status: 500 }
    )
  }
}
