import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categorySlug = searchParams.get('category')
    const search = searchParams.get('search')
    
    const where: any = { status: 'active' }
    
    if (categorySlug) {
      where.categories = {
        some: { slug: categorySlug }
      }
    }
    
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive'
      }
    }
    
    const models = await prisma.model.findMany({
      where,
      include: {
        images: { take: 1, orderBy: { order: 'asc' } },
        categories: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(models)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const model = await prisma.model.create({
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
        status: body.status || 'active'
      }
    })
    
    return NextResponse.json(model, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create model' }, { status: 500 })
  }
}



