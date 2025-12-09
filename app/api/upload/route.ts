import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Получаем директорию для загрузок
function getUploadDir(): string {
  // В Docker standalone режиме process.cwd() указывает на /app
  // Используем переменную окружения или fallback
  const baseDir = process.env.UPLOAD_DIR || process.cwd()
  return path.join(baseDir, 'public', 'images', 'uploads')
}

// Создаём директорию если не существует
async function ensureUploadDir(): Promise<string> {
  const uploadDir = getUploadDir()
  
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
    console.log('[Upload] Created upload directory:', uploadDir)
  }
  
  return uploadDir
}

// Валидация файла
function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024 // 10MB
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'Файл слишком большой (максимум 10MB)' }
  }
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Недопустимый тип файла. Разрешены: JPEG, PNG, GIF, WebP, SVG' }
  }
  
  return { valid: true }
}

// Очистка имени файла
function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    
    if (!file) {
      return NextResponse.json(
        { error: 'Файл не загружен' }, 
        { status: 400 }
      )
    }
    
    // Валидируем файл
    const validation = validateFile(file)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error }, 
        { status: 400 }
      )
    }
    
    // Подготавливаем директорию
    const uploadDir = await ensureUploadDir()
    
    // Читаем файл
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Генерируем уникальное имя файла
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 8)
    const sanitizedName = sanitizeFilename(file.name)
    const filename = `${timestamp}-${randomId}-${sanitizedName}`
    
    // Полный путь к файлу
    const filepath = path.join(uploadDir, filename)
    
    // Записываем файл
    await writeFile(filepath, buffer)
    
    console.log('[Upload] File saved:', filepath)
    
    // Возвращаем публичный URL
    const publicUrl = `/images/uploads/${filename}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename
    })
  } catch (error) {
    console.error('[Upload] Error:', error)
    return NextResponse.json(
      { error: 'Ошибка загрузки файла' }, 
      { status: 500 }
    )
  }
}

// Route Segment Config для Next.js App Router
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
