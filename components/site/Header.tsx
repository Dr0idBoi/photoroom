'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="logo">
          Photoroom
        </Link>
        
        <nav className="nav-links">
          <Link href="/service-page-3">Наши Услуги</Link>
          <Link href="/catalog">Каталог моделей</Link>
          <Link href="/portfolio">Портфолио</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/contacts">Контакты</Link>
          <a href="tel:+79857438748" className="phone-link">+7 (985) 743 87 48</a>
          
          <div className="lang-switcher">
            <Link href="/">ru</Link>
            <span>/</span>
            <Link href="/eng">en</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}



