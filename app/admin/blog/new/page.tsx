'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import ImageUpload from '@/components/admin/ImageUpload'

export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Photoroom',
    featuredImage: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/blog')
      } else {
        alert('Ошибка при создании поста')
      }
    } catch (error) {
      alert('Ошибка при создании поста')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/blog" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Создать пост</h1>
            <Link href="/admin/blog" className="btn-admin secondary">
              Назад
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Заголовок *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Slug (URL) *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="kak-stat-modelyu"
                required
              />
            </div>

            <div className="form-group">
              <label>Краткое описание</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Контент *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                required
              />
            </div>

            <div className="form-group">
              <label>Автор</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <ImageUpload
              label="Главное изображение"
              currentImage={formData.featuredImage}
              onImageUploaded={(url) => setFormData({ ...formData, featuredImage: url })}
            />

            <div style={{ marginTop: '30px' }}>
              <button type="submit" className="btn-admin" disabled={loading}>
                {loading ? 'Создание...' : 'Создать пост'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}


