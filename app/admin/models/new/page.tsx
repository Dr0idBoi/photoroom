'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NewModelPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    height: '',
    bust: '',
    waist: '',
    hips: '',
    shoeSize: '',
    hairColor: '',
    status: 'active'
  })
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          height: formData.height ? parseInt(formData.height) : null,
          bust: formData.bust ? parseInt(formData.bust) : null,
          waist: formData.waist ? parseInt(formData.waist) : null,
          hips: formData.hips ? parseInt(formData.hips) : null
        })
      })

      if (response.ok) {
        const model = await response.json()
        
        // Upload images
        for (const imageUrl of images) {
          await fetch('/api/model-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              modelId: model.id,
              url: imageUrl
            })
          })
        }

        router.push('/admin/models')
      } else {
        alert('Ошибка при создании модели')
      }
    } catch (error) {
      alert('Ошибка при создании модели')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/models" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Создать модель</h1>
            <Link href="/admin/models" className="btn-admin secondary">
              Назад
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Имя *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Slug (URL) *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="ekaterina-120"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>Рост (см)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Размер обуви</label>
                <input
                  type="text"
                  value={formData.shoeSize}
                  onChange={(e) => setFormData({ ...formData, shoeSize: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>Обхват груди (см)</label>
                <input
                  type="number"
                  value={formData.bust}
                  onChange={(e) => setFormData({ ...formData, bust: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Обхват талии (см)</label>
                <input
                  type="number"
                  value={formData.waist}
                  onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Обхват бедер (см)</label>
                <input
                  type="number"
                  value={formData.hips}
                  onChange={(e) => setFormData({ ...formData, hips: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Цвет волос</label>
              <input
                type="text"
                value={formData.hairColor}
                onChange={(e) => setFormData({ ...formData, hairColor: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Статус</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Активна</option>
                <option value="inactive">Неактивна</option>
              </select>
            </div>

            <ImageUpload
              label="Фото модели"
              onImageUploaded={(url) => setImages([...images, url])}
            />

            {images.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Загруженные фото:</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          background: 'red',
                          color: 'white',
                          border: 'none',
                          padding: '2px 6px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '30px' }}>
              <button type="submit" className="btn-admin" disabled={loading}>
                {loading ? 'Создание...' : 'Создать модель'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

