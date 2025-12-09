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
    const service = await prisma.service.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      }
    })
    
    if (!service) {
      return NextResponse.json(
        { error: 'Услуга не найдена' }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('[API] GET /api/services/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения услуги' }, 
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
    const existing = await prisma.service.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Услуга не найдена' }, 
        { status: 404 }
      )
    }
    
    // Проверяем уникальность slug
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.service.findUnique({
        where: { slug: body.slug }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Услуга с таким slug уже существует' }, 
          { status: 400 }
        )
      }
    }
    
    const service = await prisma.service.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        slug: body.slug?.toLowerCase().trim(),
        description: body.description !== undefined ? body.description : undefined,
        content: body.content !== undefined ? body.content : undefined,
        priceInfo: body.priceInfo !== undefined ? body.priceInfo : undefined,
        categoryGroup: body.categoryGroup !== undefined ? body.categoryGroup : undefined,
        images: body.images !== undefined ? body.images : undefined,
        order: body.order !== undefined ? parseInt(body.order) : undefined
      }
    })
    
    console.log('[API] Service updated:', id)
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('[API] PUT /api/services/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка обновления услуги' }, 
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
    
    const existing = await prisma.service.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Услуга не найдена' }, 
        { status: 404 }
      )
    }
    
    await prisma.service.delete({
      where: { id }
    })
    
    console.log('[API] Service deleted:', id)
    
    return NextResponse.json({ 
      success: true,
      message: 'Услуга успешно удалена' 
    })
  } catch (error) {
    console.error('[API] DELETE /api/services/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка удаления услуги' }, 
      { status: 500 }
    )
  }
}
