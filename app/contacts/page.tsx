import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'

export default function ContactsPage() {
  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Наши контакты</h1>
          <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '50px' }}>
            Вы можете связаться с нами любым удобным способом: позвонить, написать на email или мессенджер
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div className="service-card">
              <h3>Телефон</h3>
              <p style={{ marginTop: '15px' }}>
                <a href="tel:+79857438748" style={{ fontSize: '20px', fontWeight: '600' }}>
                  +7 (985) 743 87 48
                </a>
              </p>
            </div>

            <div className="service-card">
              <h3>Email</h3>
              <p style={{ marginTop: '15px' }}>
                <a href="mailto:info@klicme.ru" style={{ fontSize: '20px', fontWeight: '600' }}>
                  info@klicme.ru
                </a>
              </p>
            </div>

            <div className="service-card">
              <h3>Адрес</h3>
              <p style={{ marginTop: '15px', fontSize: '16px' }}>
                г. Москва,<br />
                ул. Новослободская 36, стр. 1
              </p>
            </div>
          </div>

          <div style={{ marginTop: '60px', maxWidth: '600px', margin: '60px auto 0' }}>
            <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '30px' }}>
              Отправить заявку
            </h2>
            
            <form className="contact-form" action="/api/contact" method="POST">
              <div className="form-group">
                <label htmlFor="name">Ваше имя</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email (необязательно)</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Сообщение</label>
                <textarea id="message" name="message"></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Отправить заявку
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}



