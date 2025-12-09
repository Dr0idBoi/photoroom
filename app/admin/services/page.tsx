import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminServicesPage() {
  await checkAuth()
  
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/services" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Услуги</h1>
            <Link href="/admin/services/new" className="btn-admin">Добавить услугу</Link>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Slug</th>
                  <th>Группа</th>
                  <th>Порядок</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{service.slug}</td>
                    <td>{service.categoryGroup || '-'}</td>
                    <td>{service.order}</td>
                    <td>
                      <div className="action-buttons">
                        <Link href={`/${service.slug}`} className="btn-admin secondary">Просмотр</Link>
                        <Link href={`/admin/services/${service.id}/edit`} className="btn-admin">Редактировать</Link>
                        <DeleteButton 
                          id={service.id} 
                          type="service" 
                          name={service.name}
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
