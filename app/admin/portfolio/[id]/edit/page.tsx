'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditPortfolioPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    serviceType: ''
  })
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    fetchItem()
  }, [])

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/portfolio/${params.id}`)
      const data = await response.json()
      
      setFormData({
        title: data.title || '',
        description: data.description || '',
        serviceType: data.serviceType || ''
      })
      
      if (data.images) {
        try {
          const parsedImages = JSON.parse(data.images)
          setImages(parsedImages)
        } catch (e) {
          // Invalid JSON
        }
      }
    } catch (error) {
      alert('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/portfolio/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: JSON.stringify(images)
        })
      })

      if (response.ok) {
        router.push('/admin/portfolio')
      } else {
        alert('Ошибка при сохранении')
      }
    } catch (error) {
      alert('Ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/portfolio" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Редактировать работу</h1>
            <Link href="/admin/portfolio" className="btn-admin secondary">
              Назад
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Название *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>Тип услуги</label>
              <input
                type="text"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              />
            </div>

            {images.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Текущие изображения:</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {images.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Удалить это изображение?')) {
                            setImages(images.filter((_, i) => i !== idx))
                          }
                        }}
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

            <ImageUpload
              label="Добавить изображения проекта"
              onImageUploaded={(url) => setImages([...images, url])}
            />

            <div style={{ marginTop: '30px' }}>
              <button type="submit" className="btn-admin" disabled={saving}>
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

