import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация
    if (!body.modelId || !body.url) {
      return NextResponse.json(
        { error: 'ID модели и URL изображения обязательны' }, 
        { status: 400 }
      )
    }
    
    // Проверяем существование модели
    const model = await prisma.model.findUnique({
      where: { id: body.modelId }
    })
    
    if (!model) {
      return NextResponse.json(
        { error: 'Модель не найдена' }, 
        { status: 404 }
      )
    }
    
    // Определяем порядок для нового изображения
    const lastImage = await prisma.modelImage.findFirst({
      where: { modelId: body.modelId },
      orderBy: { order: 'desc' }
    })
    
    const nextOrder = lastImage ? lastImage.order + 1 : 0
    
    const image = await prisma.modelImage.create({
      data: {
        modelId: body.modelId,
        url: body.url,
        alt: body.alt || null,
        order: body.order ?? nextOrder
      }
    })
    
    console.log('[API] Model image created:', image.id)
    
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/model-images error:', error)
    return NextResponse.json(
      { error: 'Ошибка добавления изображения' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const modelId = searchParams.get('modelId')
    
    if (!modelId) {
      return NextResponse.json(
        { error: 'ID модели обязателен' }, 
        { status: 400 }
      )
    }
    
    const images = await prisma.modelImage.findMany({
      where: { modelId },
      orderBy: { order: 'asc' }
    })
    
    return NextResponse.json(images)
  } catch (error) {
    console.error('[API] GET /api/model-images error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения изображений' }, 
      { status: 500 }
    )
  }
}
