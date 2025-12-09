'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteButtonProps {
  id: string
  type: 'model' | 'blog' | 'portfolio' | 'service' | 'category'
  name: string
  onDeleted?: () => void
}

const API_ENDPOINTS: Record<DeleteButtonProps['type'], string> = {
  model: '/api/models',
  blog: '/api/blog',
  portfolio: '/api/portfolio',
  service: '/api/services',
  category: '/api/categories'
}

export default function DeleteButton({ id, type, name, onDeleted }: DeleteButtonProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Вы уверены, что хотите удалить "${name}"?\n\nЭто действие нельзя отменить.`)) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch(`${API_ENDPOINTS[type]}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        if (onDeleted) {
          onDeleted()
        } else {
          router.refresh()
        }
      } else {
        const data = await response.json().catch(() => ({}))
        alert(data.error || 'Ошибка при удалении')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Ошибка при удалении')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="btn-admin danger"
      disabled={deleting}
      style={{
        opacity: deleting ? 0.6 : 1,
        cursor: deleting ? 'not-allowed' : 'pointer',
      }}
    >
      {deleting ? 'Удаление...' : 'Удалить'}
    </button>
  )
}
