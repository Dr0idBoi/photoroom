'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    featuredImage: ''
  })

  useEffect(() => {
    fetchPost()
  }, [])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${params.id}`)
      const data = await response.json()
      
      setFormData({
        title: data.title || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        author: data.author || '',
        featuredImage: data.featuredImage || ''
      })
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
      const response = await fetch(`/api/blog/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/blog')
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
        <Sidebar currentPath="/admin/blog" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Редактировать пост</h1>
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

            {formData.featuredImage && (
              <div style={{ marginBottom: '20px' }}>
                <h3>Текущее изображение:</h3>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img 
                    src={formData.featuredImage} 
                    alt="Featured" 
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Удалить текущее изображение?')) {
                        setFormData({ ...formData, featuredImage: '' })
                      }
                    }}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '3px'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            )}

            <ImageUpload
              label={formData.featuredImage ? "Заменить главное изображение" : "Загрузить главное изображение"}
              onImageUploaded={(url) => setFormData({ ...formData, featuredImage: url })}
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

