import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.portfolio.findMany({
      orderBy: { date: 'desc' }
    })
    
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const item = await prisma.portfolio.create({
      data: {
        title: body.title,
        description: body.description,
        images: body.images,
        serviceType: body.serviceType,
        date: body.date ? new Date(body.date) : new Date()
      }
    })
    
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create portfolio item' }, { status: 500 })
  }
}



