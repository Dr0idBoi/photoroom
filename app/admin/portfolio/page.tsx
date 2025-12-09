import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminPortfolioPage() {
  await checkAuth()
  
  const items = await prisma.portfolio.findMany({
    orderBy: { date: 'desc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/portfolio" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Портфолио</h1>
            <Link href="/admin/portfolio/new" className="btn-admin">Добавить работу</Link>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Тип услуги</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.serviceType || '-'}</td>
                    <td>{new Date(item.date).toLocaleDateString('ru-RU')}</td>
                    <td>
                      <div className="action-buttons">
                        <Link href={`/admin/portfolio/${item.id}/edit`} className="btn-admin">Редактировать</Link>
                        <DeleteButton 
                          id={item.id} 
                          type="portfolio" 
                          name={item.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Работ пока нет. Добавьте первую работу!
            </p>
          )}
        </main>
      </div>
    </>
  )
}



