import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await prisma.portfolio.findUnique({
      where: { id: params.id }
    })
    
    if (!item) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 })
    }
    
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio item' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const item = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        images: body.images,
        serviceType: body.serviceType,
        date: body.date ? new Date(body.date) : undefined
      }
    })
    
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio item' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.portfolio.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Portfolio item deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete portfolio item' }, { status: 500 })
  }
}

