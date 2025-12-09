import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { prisma } from '@/lib/prisma'

export default async function PortfolioPage() {
  const items = await prisma.portfolio.findMany({
    orderBy: { date: 'desc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Портфолио</h1>
          
          <div className="services-grid">
            {items.map(item => {
              let images = []
              if (item.images) {
                try {
                  images = JSON.parse(item.images)
                } catch (e) {
                  // Invalid JSON
                }
              }
              
              return (
                <div key={item.id} className="model-card">
                  <div style={{ 
                    width: '100%', 
                    height: '300px', 
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {images[0] ? (
                      <img src={images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>Фото проекта</span>
                    )}
                  </div>
                  <div className="model-info">
                    <h3 className="model-name">{item.title}</h3>
                    {item.description && (
                      <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {items.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              Портфолио скоро будет добавлено
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}



