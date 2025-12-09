import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminModelsPage() {
  await checkAuth()
  
  const models = await prisma.model.findMany({
    include: {
      categories: true,
      images: { take: 1 }
    },
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/models" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Модели</h1>
            <Link href="/admin/models/new" className="btn-admin">Добавить модель</Link>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Рост</th>
                  <th>Категории</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {models.map(model => (
                  <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{model.height ? `${model.height} см` : '-'}</td>
                    <td>{model.categories.map(c => c.name).join(', ') || '-'}</td>
                    <td>{model.status === 'active' ? 'Активна' : 'Неактивна'}</td>
                    <td>
                      <div className="action-buttons">
                        <Link href={`/model/${model.slug}`} className="btn-admin secondary">Просмотр</Link>
                        <Link href={`/admin/models/${model.id}/edit`} className="btn-admin">Редактировать</Link>
                        <DeleteButton 
                          id={model.id} 
                          type="model" 
                          name={model.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {models.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Моделей пока нет. Добавьте первую модель!
            </p>
          )}
        </main>
      </div>
    </>
  )
}



