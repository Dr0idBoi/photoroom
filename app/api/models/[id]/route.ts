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
    const model = await prisma.model.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      },
      include: {
        images: { orderBy: { order: 'asc' } },
        categories: true
      }
    })
    
    if (!model) {
      return NextResponse.json(
        { error: 'Модель не найдена' }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json(model)
  } catch (error) {
    console.error('[API] GET /api/models/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения модели' }, 
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
    
    // Проверяем существование модели
    const existing = await prisma.model.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Модель не найдена' }, 
        { status: 404 }
      )
    }
    
    // Проверяем уникальность slug, если он изменился
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.model.findUnique({
        where: { slug: body.slug }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Модель с таким slug уже существует' }, 
          { status: 400 }
        )
      }
    }
    
    const model = await prisma.model.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        slug: body.slug?.toLowerCase().trim(),
        height: body.height !== undefined ? (body.height ? parseInt(body.height) : null) : undefined,
        bust: body.bust !== undefined ? (body.bust ? parseInt(body.bust) : null) : undefined,
        waist: body.waist !== undefined ? (body.waist ? parseInt(body.waist) : null) : undefined,
        hips: body.hips !== undefined ? (body.hips ? parseInt(body.hips) : null) : undefined,
        shoeSize: body.shoeSize !== undefined ? body.shoeSize : undefined,
        hairColor: body.hairColor !== undefined ? body.hairColor : undefined,
        skills: body.skills !== undefined ? body.skills : undefined,
        status: body.status,
        categories: body.categoryIds ? {
          set: body.categoryIds.map((catId: string) => ({ id: catId }))
        } : undefined
      },
      include: {
        images: true,
        categories: true
      }
    })
    
    console.log('[API] Model updated:', id)
    
    return NextResponse.json(model)
  } catch (error) {
    console.error('[API] PUT /api/models/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка обновления модели' }, 
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
    
    // Проверяем существование
    const existing = await prisma.model.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Модель не найдена' }, 
        { status: 404 }
      )
    }
    
    // Удаляем модель (изображения удалятся каскадно)
    await prisma.model.delete({
      where: { id }
    })
    
    console.log('[API] Model deleted:', id)
    
    return NextResponse.json({ 
      success: true,
      message: 'Модель успешно удалена' 
    })
  } catch (error) {
    console.error('[API] DELETE /api/models/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка удаления модели' }, 
      { status: 500 }
    )
  }
}
