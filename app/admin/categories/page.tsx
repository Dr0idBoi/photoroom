import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminCategoriesPage() {
  await checkAuth()
  
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { models: true }
      }
    },
    orderBy: { order: 'asc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/categories" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Категории</h1>
            <Link href="/admin/categories/new" className="btn-admin">Создать категорию</Link>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Slug</th>
                  <th>Тип</th>
                  <th>Моделей</th>
                  <th>Порядок</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>{category.slug}</td>
                    <td>{category.type}</td>
                    <td>{category._count.models}</td>
                    <td>{category.order}</td>
                    <td>
                      <div className="action-buttons">
                        <DeleteButton 
                          id={category.id} 
                          type="category" 
                          name={category.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  )
}
