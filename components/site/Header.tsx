'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image 
            src="/images/Logo.png" 
            alt="Klic me" 
            width={50} 
            height={50}
            style={{ objectFit: 'contain' }}
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Klic me</span>
        </Link>
        
        <nav className="nav-links">
          <Link href="/service-page-3">Наши Услуги</Link>
          <Link href="/catalog">Каталог моделей</Link>
          <Link href="/portfolio">Портфолио</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/contacts">Контакты</Link>
          <a href="tel:+79857438748" className="phone-link">+7 (985) 743 87 48</a>
        </nav>
      </div>
    </header>
  )
}



