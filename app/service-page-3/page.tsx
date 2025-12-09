import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServiceCard from '@/components/site/ServiceCard'
import { prisma } from '@/lib/prisma'

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' }
  }).catch(() => [])

  const grouped = {
    shooting: services.filter(s => s.categoryGroup === 'shooting'),
    events: services.filter(s => s.categoryGroup === 'events'),
    exhibitions: services.filter(s => s.categoryGroup === 'exhibitions'),
    sports: services.filter(s => s.categoryGroup === 'sports'),
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Услуги модельного агентства</h1>

          {/* For shooting */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              marginBottom: '40px',
              textTransform: 'uppercase',
              borderLeft: '5px solid #000',
              paddingLeft: '20px',
              letterSpacing: '1px'
            }}>Для съемок</h2>
            <div className="services-grid">
              {grouped.shooting.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* For events */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              marginBottom: '40px',
              textTransform: 'uppercase',
              borderLeft: '5px solid #000',
              paddingLeft: '20px',
              letterSpacing: '1px'
            }}>Для мероприятий</h2>
            <div className="services-grid">
              {grouped.events.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* For exhibitions */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              marginBottom: '40px',
              textTransform: 'uppercase',
              borderLeft: '5px solid #000',
              paddingLeft: '20px',
              letterSpacing: '1px'
            }}>Для выставок</h2>
            <div className="services-grid">
              {grouped.exhibitions.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* For sports */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              marginBottom: '40px',
              textTransform: 'uppercase',
              borderLeft: '5px solid #000',
              paddingLeft: '20px',
              letterSpacing: '1px'
            }}>Для спортивных событий</h2>
            <div className="services-grid">
              {grouped.sports.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}



