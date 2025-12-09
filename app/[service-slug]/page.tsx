import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { getServiceImage } from '@/lib/service-images'

// This is a dynamic route that handles all service pages
export default async function ServicePage({ params }: { params: { 'service-slug': string } }) {
  const slug = params['service-slug']
  
  // List of valid service slugs
  const validServices = [
    'shot-service', 'man-service', 'kids-service', 'hostes-service',
    'expo-service', 'stendist-service', 'body-service', 'painter-service',
    'barmen-service', 'podium-service', 'party-service', 'exotic-service',
    'fitness-service', 'ring-service', 'grid-service', 'promo-service',
    'gogo-service', 'tequila-service', 'twins-service', 'tattoo-service',
    'translator-service', 'bar-service', 'plussize-service', 'nu-service',
    'fotomodeli-dlya-marketpleysov', 'makeup-service', 'photo-service',
    'session-service', 'sewing-service'
  ]
  
  if (!validServices.includes(slug)) {
    notFound()
  }
  
  const service = await prisma.service.findUnique({
    where: { slug }
  }).catch(() => null)
  
  if (!service) {
    notFound()
  }
  
  // Get related models from categories
  const models = await prisma.model.findMany({
    take: 8,
    include: {
      images: { take: 1, orderBy: { order: 'asc' } }
    }
  }).catch(() => [])
  
  let priceInfo: any = {}
  if (service.priceInfo) {
    try {
      priceInfo = JSON.parse(service.priceInfo)
    } catch (e) {
      // Invalid JSON
    }
  }
  
  const serviceImage = getServiceImage(service.slug)

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="hero-section" style={{ minHeight: '50vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}>
            <img 
              src={serviceImage}
              alt={service.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.15,
                filter: 'blur(2px)'
              }}
            />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="hero-title" style={{ fontSize: '40px' }}>{service.name}</h1>
            {service.description && (
              <p style={{ fontSize: '18px', maxWidth: '600px', marginTop: '20px' }}>
                {service.description}
              </p>
            )}
          </div>
        </section>

        <section className="services-section">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              marginBottom: '40px',
              borderBottom: '2px solid #ddd'
            }}>
              <div style={{ 
                padding: '15px 30px', 
                borderBottom: '3px solid #000',
                fontWeight: '600',
                marginBottom: '-2px'
              }}>
                Инфо
              </div>
            </div>

            {/* Info Section */}
            <div style={{ marginBottom: '60px' }}>
              {service.content && (
                <div 
                  style={{ 
                    fontSize: '16px', 
                    lineHeight: '1.8',
                    marginBottom: '40px'
                  }}
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              )}
            </div>

            {/* Pricing */}
            <div className="service-card" style={{ marginBottom: '60px', textAlign: 'left', padding: '40px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Стоимость</h2>
              
              {priceInfo.base && (
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                  <strong>Базовая стоимость:</strong> от {priceInfo.base} рублей
                </div>
              )}
              {priceInfo.hourly && (
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                  <strong>Почасовая оплата:</strong> {priceInfo.hourly} рублей/час
                </div>
              )}
              {priceInfo.daily && (
                <div style={{ marginBottom: '20px', fontSize: '18px' }}>
                  <strong>Дневная ставка:</strong> от {priceInfo.daily} рублей/день
                </div>
              )}
              
              <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
                Цены ориентировочные и могут отличаться в зависимости от условий проекта
              </p>
            </div>

            {/* Models */}
            {models.length > 0 && (
              <div style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Каталог моделей</h2>
                <div className="services-grid">
                  {models.map(model => (
                    <Link key={model.id} href={`/model/${model.slug}`} className="model-card">
                      <div style={{ 
                        width: '100%', 
                        height: '300px', 
                        background: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {model.images[0] ? (
                          <img src={model.images[0].url} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>Фото</span>
                        )}
                      </div>
                      <div className="model-info">
                        <h3 className="model-name">{model.name}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <Link href="/catalog" className="btn-primary">
                    Смотреть больше →
                  </Link>
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ 
              background: '#f5f5f5', 
              padding: '40px', 
              textAlign: 'center',
              borderRadius: '8px'
            }}>
              <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
                Заказать {service.name.toLowerCase()}
              </h2>
              <p style={{ marginBottom: '30px', color: '#666' }}>
                Свяжитесь с нами для получения консультации
              </p>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contacts" className="btn-primary">
                  Оставить заявку
                </Link>
                <a href="tel:+79857438748" className="btn-primary" style={{ background: '#666' }}>
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

// Generate static params for all service pages
export async function generateStaticParams() {
  const services = await prisma.service.findMany({
    select: { slug: true }
  }).catch(() => [])
  
  return services.map(service => ({
    'service-slug': service.slug
  }))
}



