import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Проверяем существование
    const existing = await prisma.modelImage.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Изображение не найдено' }, 
        { status: 404 }
      )
    }
    
    const image = await prisma.modelImage.update({
      where: { id },
      data: {
        url: body.url !== undefined ? body.url : undefined,
        alt: body.alt !== undefined ? body.alt : undefined,
        order: body.order !== undefined ? parseInt(body.order) : undefined
      }
    })
    
    console.log('[API] Model image updated:', id)
    
    return NextResponse.json(image)
  } catch (error) {
    console.error('[API] PUT /api/model-images/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка обновления изображения' }, 
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
    
    const existing = await prisma.modelImage.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Изображение не найдено' }, 
        { status: 404 }
      )
    }
    
    await prisma.modelImage.delete({
      where: { id }
    })
    
    console.log('[API] Model image deleted:', id)
    
    return NextResponse.json({ 
      success: true,
      message: 'Изображение успешно удалено' 
    })
  } catch (error) {
    console.error('[API] DELETE /api/model-images/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка удаления изображения' }, 
      { status: 500 }
    )
  }
}
