import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'

export default async function AdminDashboard() {
  await checkAuth()
  
  const stats = {
    models: await prisma.model.count().catch(() => 0),
    categories: await prisma.category.count().catch(() => 0),
    posts: await prisma.blogPost.count().catch(() => 0),
    portfolio: await prisma.portfolio.count().catch(() => 0),
    services: await prisma.service.count().catch(() => 0),
    contacts: await prisma.contactSubmission.count().catch(() => 0)
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Панель управления</h1>
          </div>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Всего моделей</h3>
              <div className="stat-value">{stats.models}</div>
            </div>
            <div className="stat-card">
              <h3>Категории</h3>
              <div className="stat-value">{stats.categories}</div>
            </div>
            <div className="stat-card">
              <h3>Статьи блога</h3>
              <div className="stat-value">{stats.posts}</div>
            </div>
            <div className="stat-card">
              <h3>Работы</h3>
              <div className="stat-value">{stats.portfolio}</div>
            </div>
            <div className="stat-card">
              <h3>Услуги</h3>
              <div className="stat-value">{stats.services}</div>
            </div>
            <div className="stat-card">
              <h3>Заявки</h3>
              <div className="stat-value">{stats.contacts}</div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '30px', borderRadius: '8px' }}>
            <h2 style={{ marginBottom: '20px' }}>Быстрые действия</h2>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <Link href="/admin/models/new" className="btn-admin">Добавить модель</Link>
              <Link href="/admin/blog/new" className="btn-admin">Создать пост</Link>
              <Link href="/admin/portfolio/new" className="btn-admin">Добавить работу</Link>
              <Link href="/admin/categories/new" className="btn-admin">Создать категорию</Link>
              <Link href="/admin/services/new" className="btn-admin">Добавить услугу</Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}



