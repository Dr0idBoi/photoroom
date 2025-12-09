import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const model = await prisma.model.findUnique({
      where: { id: params.id },
      include: {
        images: { orderBy: { order: 'asc' } },
        categories: true
      }
    })
    
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 404 })
    }
    
    return NextResponse.json(model)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch model' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const model = await prisma.model.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        height: body.height,
        bust: body.bust,
        waist: body.waist,
        hips: body.hips,
        shoeSize: body.shoeSize,
        hairColor: body.hairColor,
        skills: body.skills,
        status: body.status
      }
    })
    
    return NextResponse.json(model)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update model' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.model.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Model deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete model' }, { status: 500 })
  }
}



