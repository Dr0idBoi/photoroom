import Link from 'next/link'

interface SidebarProps {
  currentPath?: string
}

export default function Sidebar({ currentPath = '' }: SidebarProps) {
  return (
    <aside className="admin-sidebar">
      <h1>Photoroom</h1>
      <nav>
        <ul className="admin-nav">
          <li>
            <Link href="/admin" className={currentPath === '/admin' ? 'active' : ''}>
              Панель управления
            </Link>
          </li>
          <li>
            <Link href="/admin/models" className={currentPath.startsWith('/admin/models') ? 'active' : ''}>
              Модели
            </Link>
          </li>
          <li>
            <Link href="/admin/categories" className={currentPath.startsWith('/admin/categories') ? 'active' : ''}>
              Категории
            </Link>
          </li>
          <li>
            <Link href="/admin/blog" className={currentPath.startsWith('/admin/blog') ? 'active' : ''}>
              Блог
            </Link>
          </li>
          <li>
            <Link href="/admin/services" className={currentPath.startsWith('/admin/services') ? 'active' : ''}>
              Услуги
            </Link>
          </li>
          <li>
            <Link href="/admin/portfolio" className={currentPath.startsWith('/admin/portfolio') ? 'active' : ''}>
              Портфолио
            </Link>
          </li>
          <li>
            <Link href="/admin/contacts" className={currentPath.startsWith('/admin/contacts') ? 'active' : ''}>
              Заявки
            </Link>
          </li>
          <li>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white',
                cursor: 'pointer',
                padding: '10px 15px',
                width: '100%',
                textAlign: 'left'
              }}>
                Выход
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </aside>
  )
}


