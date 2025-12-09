import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <Image 
            src="/images/Logo.png" 
            alt="Klic me" 
            width={150} 
            height={50}
            style={{ objectFit: 'contain', marginBottom: '15px' }}
          />
          <p>Модельное агентство Москвы, которое предлагает широкий спектр комплексных услуг в сфере подбора моделей на событийные мероприятия.</p>
        </div>
        
        <div className="footer-section">
          <h3>Навигация</h3>
          <ul>
            <li><Link href="/">Главная</Link></li>
            <li><Link href="/service-page-3">Наши услуги</Link></li>
            <li><Link href="/catalog">Каталог моделей</Link></li>
            <li><Link href="/portfolio">Портфолио</Link></li>
            <li><Link href="/blog">Блог</Link></li>
            <li><Link href="/contacts">Контакты</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Моделям</h3>
          <ul>
            <li><Link href="/casting">Кастинги</Link></li>
            <li><Link href="/vacancies">Вакансии</Link></li>
            <li><Link href="/blog">Информация</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Контакты</h3>
          <ul>
            <li><a href="tel:+79857438748">+7 (985) 743 87 48</a></li>
            <li><a href="mailto:info@klicme.ru">info@klicme.ru</a></li>
            <li>г. Москва, ул. Новослободская 36, стр. 1</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Klic me. Все права защищены.</p>
      </div>
    </footer>
  )
}



