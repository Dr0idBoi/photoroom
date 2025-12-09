import { checkAuth } from '@/lib/auth-check'
import { prisma } from '@/lib/prisma'
import Sidebar from '@/components/admin/Sidebar'

export default async function AdminContactsPage() {
  await checkAuth()
  
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/admin.css" />
      <div className="admin-layout">
        <Sidebar currentPath="/admin/contacts" />

        <main className="admin-content">
          <div className="admin-header">
            <h1>Заявки с сайта</h1>
          </div>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Телефон</th>
                  <th>Email</th>
                  <th>Сообщение</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(submission => (
                  <tr key={submission.id}>
                    <td>{submission.name}</td>
                    <td><a href={`tel:${submission.phone}`}>{submission.phone}</a></td>
                    <td>{submission.email ? <a href={`mailto:${submission.email}`}>{submission.email}</a> : '-'}</td>
                    <td>{submission.message ? submission.message.substring(0, 50) + '...' : '-'}</td>
                    <td>{new Date(submission.createdAt).toLocaleDateString('ru-RU')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {submissions.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              Заявок пока нет.
            </p>
          )}
        </main>
      </div>
    </>
  )
}
