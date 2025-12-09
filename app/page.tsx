import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServiceCard from '@/components/site/ServiceCard'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  let services: any[] = []
  
  try {
    services = await prisma.service.findMany({
      take: 12,
      orderBy: { order: 'asc' }
    })
    console.log('Homepage services loaded:', services.length)
  } catch (error) {
    console.error('Error loading services:', error)
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.2,
              zIndex: 0
            }}
          >
            <source src="/images/582a3fdb59700a67442baecf_getmodels_startBest_Quality_transcode.mp4" type="video/mp4" />
          </video>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="hero-title">МОДЕЛЬНОЕ АГЕНТСТВО</h1>
            <h2 className="hero-subtitle">Красивые модели на ваши проекты</h2>
            <Link href="/service-page-3" className="btn-primary">
              Перейти к услугам →
            </Link>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Наши услуги</h2>
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/service-page-3" className="btn-primary">
              СМОТРЕТЬ все →
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="services-section">
          <h2 className="section-title">О нас в цифрах</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            textAlign: 'center',
            padding: '40px 0'
          }}>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>300+</h3>
              <p>моделей и промо персонала</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>ТОП 3</h3>
              <p>Лучшее модельное агентство Москвы</p>
            </div>
            <div>
              <h3 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>500+</h3>
              <p>успешных мероприятий и ивентов</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          background: '#f5f5f5', 
          padding: '60px 30px', 
          textAlign: 'center' 
        }}>
          <h2 className="section-title">Готовы начать работу?</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Свяжитесь с нами для консультации по подбору моделей
          </p>
          <Link href="/contacts" className="btn-primary">
            Связаться с нами
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}



