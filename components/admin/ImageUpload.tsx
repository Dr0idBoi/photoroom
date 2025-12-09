'use client'

import { useState } from 'react'

interface ImageUploadProps {
  currentImage?: string
  onImageUploaded: (url: string) => void
  label?: string
}

export default function ImageUpload({ currentImage, onImageUploaded, label = 'Изображение' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || '')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setPreview(data.url)
        onImageUploaded(data.url)
      } else {
        alert('Ошибка загрузки изображения')
      }
    } catch (error) {
      alert('Ошибка загрузки изображения')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      {preview && (
        <div style={{ marginBottom: '10px' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} 
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Загрузка...</p>}
    </div>
  )
}


