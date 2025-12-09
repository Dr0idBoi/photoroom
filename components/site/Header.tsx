'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'clients' | 'models'>('clients')

  return (
    <header className="site-header">
      <div className="nav-container">
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image 
            src="/images/IMG_2544-_1_.svg" 
            alt="Klic me" 
            width={40} 
            height={40}
            style={{ objectFit: 'contain' }}
          />
          <span className="logo-text">Klic me</span>
        </Link>
        
        <nav className="nav-links desktop-nav">
          <Link href="/service-page-3">Наши Услуги</Link>
          <Link href="/catalog">Каталог моделей</Link>
          <Link href="/portfolio">Портфолио</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/contacts">Контакты</Link>
          <a href="tel:+79857438748" className="phone-link">+7 (985) 743 87 48</a>
        </nav>

        <Link href="/contacts" className="header-cta-btn">
          ЗАКАЗАТЬ
        </Link>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <h2>МОДЕЛЬНОЕ АГЕНТСТВО</h2>
            <a href="tel:+79857438748" className="mobile-phone">+7 (985) 743 87 48</a>
          </div>

          {/* Tabs */}
          <div className="mobile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients')}
            >
              Клиентам
            </button>
            <button 
              className={`tab-btn ${activeTab === 'models' ? 'active' : ''}`}
              onClick={() => setActiveTab('models')}
            >
              Моделям
            </button>
          </div>

          {/* Tab Content */}
          <div className="mobile-menu-content">
            {activeTab === 'clients' ? (
              <ul className="mobile-nav-list">
                <li><Link href="/service-page-3" onClick={() => setMobileMenuOpen(false)}>Наши услуги</Link></li>
                <li><Link href="/catalog" onClick={() => setMobileMenuOpen(false)}>Каталог моделей</Link></li>
                <li><Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>Наше портфолио</Link></li>
                <li><Link href="/contacts" onClick={() => setMobileMenuOpen(false)}>Контакты</Link></li>
              </ul>
            ) : (
              <ul className="mobile-nav-list">
                <li><Link href="/casting" onClick={() => setMobileMenuOpen(false)}>Смотреть кастинги</Link></li>
                <li><Link href="/session-service" onClick={() => setMobileMenuOpen(false)}>Записаться на фотосессию</Link></li>
                <li><Link href="/vacancies" onClick={() => setMobileMenuOpen(false)}>Устроиться моделью</Link></li>
              </ul>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
