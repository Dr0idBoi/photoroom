'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'

export default function NewCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    type: 'women',
    order: '0'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order)
        })
      })

      if (response.ok) {
        router.push('/admin/categories')
      } else {
        alert('Ошибка при создании категории')
      }
    } catch (error) {
      alert('Ошибка при создании категории')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/categories" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Создать категорию</h1>
            <Link href="/admin/categories" className="btn-admin secondary">
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
                placeholder="women, men, kids и т.д."
                required
              />
            </div>

            <div className="form-group">
              <label>Описание</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Тип *</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              />
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
                {loading ? 'Создание...' : 'Создать категорию'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}


