'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    priceInfo: '',
    categoryGroup: '',
    order: '0',
    images: ''
  })
  const [serviceImages, setServiceImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<string[]>([])

  useEffect(() => {
    fetchService()
  }, [])

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${params.id}`)
      const data = await response.json()
      
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        content: data.content || '',
        priceInfo: data.priceInfo || '',
        categoryGroup: data.categoryGroup || '',
        order: data.order?.toString() || '0',
        images: data.images || ''
      })
      
      // Парсим существующие изображения
      if (data.images) {
        try {
          const parsedImages = JSON.parse(data.images)
          if (Array.isArray(parsedImages)) {
            setServiceImages(parsedImages)
          }
        } catch (e) {
          // Если не JSON массив, возможно это одна строка
          if (data.images) {
            setServiceImages([data.images])
          }
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
      // Объединяем существующие и новые изображения
      const allImages = [...serviceImages, ...newImages]
      
      const response = await fetch(`/api/services/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order),
          images: allImages.length > 0 ? JSON.stringify(allImages) : null
        })
      })

      if (response.ok) {
        router.push('/admin/services')
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
        <Sidebar currentPath="/admin/services" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Редактировать услугу</h1>
            <Link href="/admin/services" className="btn-admin secondary">
              Назад
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Название *</label>
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
                required
              />
            </div>

            <div className="form-group">
              <label>Краткое описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Контент</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
              />
            </div>

            <div className="form-group">
              <label>Информация о цене (JSON)</label>
              <textarea
                value={formData.priceInfo}
                onChange={(e) => setFormData({ ...formData, priceInfo: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Группа категорий</label>
              <select
                value={formData.categoryGroup}
                onChange={(e) => setFormData({ ...formData, categoryGroup: e.target.value })}
              >
                <option value="shooting">Для съемок</option>
                <option value="events">Для мероприятий</option>
                <option value="exhibitions">Для выставок</option>
                <option value="sports">Для спортивных событий</option>
              </select>
            </div>

            <div className="form-group">
              <label>Порядок сортировки</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              />
            </div>

            {serviceImages.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Текущие изображения:</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {serviceImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Удалить это изображение?')) {
                            setServiceImages(serviceImages.filter((_, i) => i !== idx))
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
              label="Добавить новые изображения"
              onImageUploaded={(url) => setNewImages([...newImages, url])}
            />

            {newImages.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Новые изображения (будут добавлены при сохранении):</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {newImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => setNewImages(newImages.filter((_, i) => i !== idx))}
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

