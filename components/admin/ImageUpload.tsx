'use client'

import { useState, useRef } from 'react'

interface ImageUploadProps {
  currentImage?: string
  onImageUploaded: (url: string) => void
  label?: string
  multiple?: boolean
}

export default function ImageUpload({ 
  currentImage, 
  onImageUploaded, 
  label = 'Изображение',
  multiple = false 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || '')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError('')
    setUploading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Проверка размера на клиенте
        if (file.size > 10 * 1024 * 1024) {
          setError('Файл слишком большой (максимум 10MB)')
          setUploading(false)
          return
        }
        
        // Проверка типа
        if (!file.type.startsWith('image/')) {
          setError('Разрешены только изображения')
          setUploading(false)
          return
        }

        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        const data = await response.json()

        if (response.ok && data.success) {
          if (!multiple) {
            setPreview(data.url)
          }
          onImageUploaded(data.url)
        } else {
          setError(data.error || 'Ошибка загрузки изображения')
        }
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Ошибка загрузки изображения')
    } finally {
      setUploading(false)
      // Очищаем input для возможности повторной загрузки того же файла
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      // Создаём искусственное событие
      const input = fileInputRef.current
      if (input) {
        const dt = new DataTransfer()
        for (let i = 0; i < files.length; i++) {
          dt.items.add(files[i])
        }
        input.files = dt.files
        handleFileChange({ target: input } as React.ChangeEvent<HTMLInputElement>)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      
      {/* Превью текущего изображения */}
      {preview && !multiple && (
        <div style={{ marginBottom: '10px' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px', 
              objectFit: 'contain',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }} 
          />
        </div>
      )}
      
      {/* Область загрузки с drag & drop */}
      <div 
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #ddd',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          background: uploading ? '#f9f9f9' : '#fff',
          transition: 'all 0.2s ease'
        }}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        {uploading ? (
          <p style={{ margin: 0, color: '#666' }}>Загрузка...</p>
        ) : (
          <>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>
              Перетащите файл сюда или нажмите для выбора
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
              JPEG, PNG, GIF, WebP, SVG (до 10MB)
            </p>
          </>
        )}
      </div>
      
      {/* Скрытый input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        multiple={multiple}
        style={{ display: 'none' }}
      />
      
      {/* Сообщение об ошибке */}
      {error && (
        <p style={{ 
          color: '#dc3545', 
          fontSize: '14px', 
          marginTop: '8px',
          marginBottom: 0 
        }}>
          {error}
        </p>
      )}
    </div>
  )
}
