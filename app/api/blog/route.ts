import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit')
    
    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    })
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('[API] GET /api/blog error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения статей' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Валидация
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: 'Заголовок, slug и контент обязательны' }, 
        { status: 400 }
      )
    }
    
    // Проверяем уникальность slug
    const existing = await prisma.blogPost.findUnique({
      where: { slug: body.slug }
    })
    
    if (existing) {
      return NextResponse.json(
        { error: 'Статья с таким slug уже существует' }, 
        { status: 400 }
      )
    }
    
    const post = await prisma.blogPost.create({
      data: {
        title: body.title.trim(),
        slug: body.slug.toLowerCase().trim(),
        excerpt: body.excerpt || null,
        content: body.content,
        author: body.author || null,
        featuredImage: body.featuredImage || null,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date()
      }
    })
    
    console.log('[API] Blog post created:', post.id)
    
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('[API] POST /api/blog error:', error)
    return NextResponse.json(
      { error: 'Ошибка создания статьи' }, 
      { status: 500 }
    )
  }
}
