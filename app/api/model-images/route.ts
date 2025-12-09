import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const image = await prisma.modelImage.create({
      data: {
        modelId: body.modelId,
        url: body.url,
        alt: body.alt || null,
        order: body.order || 0
      }
    })
    
    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Error creating model image:', error)
    return NextResponse.json({ error: 'Failed to create model image' }, { status: 500 })
  }
}


