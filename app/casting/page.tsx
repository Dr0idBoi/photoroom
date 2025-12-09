import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'

export default function CastingPage() {
  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Кастинги</h1>
          <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '50px' }}>
            Актуальные кастинги для моделей и актеров
          </p>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="service-card" style={{ 
              marginBottom: '30px', 
              textAlign: 'left',
              padding: '40px'
            }}>
              <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>
                Кастинг моделей для рекламной съемки
              </h2>
              <p style={{ marginBottom: '10px' }}><strong>Требования:</strong></p>
              <ul style={{ paddingLeft: '20px', marginBottom: '15px', color: '#666' }}>
                <li>Возраст: 18-30 лет</li>
                <li>Рост: от 170 см (девушки), от 180 см (юноши)</li>
                <li>Опыт съемок приветствуется</li>
              </ul>
              <p style={{ marginBottom: '10px' }}><strong>Оплата:</strong> 15 000 - 25 000 рублей</p>
              <p style={{ marginBottom: '20px' }}><strong>Дата:</strong> Уточняется</p>
              
              <a href="/contacts" className="btn-primary">Записаться на кастинг</a>
            </div>

            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '16px', color: '#666' }}>
                Следите за актуальными кастингами в нашем <a href="https://t.me/klicme" style={{ textDecoration: 'underline' }}>Telegram-канале</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}



