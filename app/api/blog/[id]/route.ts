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
    const post = await prisma.blogPost.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ]
      }
    })
    
    if (!post) {
      return NextResponse.json(
        { error: 'Статья не найдена' }, 
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('[API] GET /api/blog/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка получения статьи' }, 
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
    const existing = await prisma.blogPost.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Статья не найдена' }, 
        { status: 404 }
      )
    }
    
    // Проверяем уникальность slug
    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug: body.slug }
      })
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Статья с таким slug уже существует' }, 
          { status: 400 }
        )
      }
    }
    
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: body.title?.trim(),
        slug: body.slug?.toLowerCase().trim(),
        excerpt: body.excerpt !== undefined ? body.excerpt : undefined,
        content: body.content,
        author: body.author !== undefined ? body.author : undefined,
        featuredImage: body.featuredImage !== undefined ? body.featuredImage : undefined,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined
      }
    })
    
    console.log('[API] Blog post updated:', id)
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('[API] PUT /api/blog/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка обновления статьи' }, 
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
    
    const existing = await prisma.blogPost.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return NextResponse.json(
        { error: 'Статья не найдена' }, 
        { status: 404 }
      )
    }
    
    await prisma.blogPost.delete({
      where: { id }
    })
    
    console.log('[API] Blog post deleted:', id)
    
    return NextResponse.json({ 
      success: true,
      message: 'Статья успешно удалена' 
    })
  } catch (error) {
    console.error('[API] DELETE /api/blog/[id] error:', error)
    return NextResponse.json(
      { error: 'Ошибка удаления статьи' }, 
      { status: 500 }
    )
  }
}
