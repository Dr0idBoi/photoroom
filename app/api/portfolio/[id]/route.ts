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
    
    const item = await prisma.portfolio.findUnique({
      where: { id }
    })
    
    if (!item) {
      return NextResponse.json(
        { error: 'Работа не найдена' }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json(item)
  } catch (error) {
    console.error('[API] GET /api/portfolio/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения работы' }, 
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
    const existing = await prisma.portfolio.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Работа не найдена' }, 
        { status: 404 }
      )
    }
    
    const item = await prisma.portfolio.update({
      where: { id },
      data: {
        title: body.title?.trim(),
        description: body.description !== undefined ? body.description : undefined,
        images: body.images !== undefined ? body.images : undefined,
        serviceType: body.serviceType !== undefined ? body.serviceType : undefined,
        date: body.date ? new Date(body.date) : undefined
      }
    })
    
    console.log('[API] Portfolio item updated:', id)
    
    return NextResponse.json(item)
  } catch (error) {
    console.error('[API] PUT /api/portfolio/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка обновления работы' }, 
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
    
    const existing = await prisma.portfolio.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Работа не найдена' }, 
        { status: 404 }
      )
    }
    
    await prisma.portfolio.delete({
      where: { id }
    })
    
    console.log('[API] Portfolio item deleted:', id)
    
    return NextResponse.json({ 
      success: true,
      message: 'Работа успешно удалена' 
    })
  } catch (error) {
    console.error('[API] DELETE /api/portfolio/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка удаления работы' }, 
      { status: 500 }
    )
  }
}
