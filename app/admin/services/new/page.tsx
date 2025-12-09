'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'

export default function NewServicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    content: '',
    priceInfo: '',
    categoryGroup: 'shooting',
    order: '0'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order)
        })
      })

      if (response.ok) {
        router.push('/admin/services')
      } else {
        alert('Ошибка при создании услуги')
      }
    } catch (error) {
      alert('Ошибка при создании услуги')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/services" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Создать услугу</h1>
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
                placeholder="shot-service"
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
                placeholder='{"base": "20000", "hourly": "5000"}'
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

            <div style={{ marginTop: '30px' }}>
              <button type="submit" className="btn-admin" disabled={loading}>
                {loading ? 'Создание...' : 'Создать услугу'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

