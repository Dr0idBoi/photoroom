import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Sidebar from '@/components/admin/Sidebar'
import DeleteButton from '@/components/admin/DeleteButton'

export default async function AdminBlogPage() {
  await checkAuth()
  
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/blog" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Блог</h1>
            <Link href="/admin/blog/new" className="btn-admin">Создать пост</Link>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Заголовок</th>
                  <th>Автор</th>
                  <th>Опубликовано</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author || '-'}</td>
                    <td>{new Date(post.publishedAt).toLocaleDateString('ru-RU')}</td>
                    <td>
                      <div className="action-buttons">
                        <Link href={`/blog/${post.slug}`} className="btn-admin secondary">Просмотр</Link>
                        <Link href={`/admin/blog/${post.id}/edit`} className="btn-admin">Редактировать</Link>
                        <DeleteButton 
                          id={post.id} 
                          type="blog" 
                          name={post.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Постов пока нет. Создайте первый пост!
            </p>
          )}
        </main>
      </div>
    </>
  )
}



