'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteButtonProps {
  id: string
  type: 'model' | 'blog' | 'portfolio' | 'service' | 'category'
  name: string
}

export default function DeleteButton({ id, type, name }: DeleteButtonProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const apiEndpoints = {
    model: '/api/models',
    blog: '/api/blog',
    portfolio: '/api/portfolio',
    service: '/api/services',
    category: '/api/categories'
  }

  const handleDelete = async () => {
    if (!confirm(`Вы уверены, что хотите удалить "${name}"?`)) {
      return
    }

    setDeleting(true)

    try {
      const response = await fetch(`${apiEndpoints[type]}/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Ошибка при удалении')
      }
    } catch (error) {
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
    >
      {deleting ? 'Удаление...' : 'Удалить'}
    </button>
  )
}


