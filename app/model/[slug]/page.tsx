import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ModelPage({ params }: { params: { slug: string } }) {
  const model = await prisma.model.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      categories: true
    }
  }).catch(() => null)

  if (!model) {
    notFound()
  }

  let skills = null
  if (model.skills) {
    try {
      skills = JSON.parse(model.skills)
    } catch (e) {
      // Invalid JSON
    }
  }

  const otherModels = await prisma.model.findMany({
    where: { id: { not: model.id }, status: 'active' },
    take: 4,
    include: {
      images: { take: 1, orderBy: { order: 'asc' } }
    }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="section-title">{model.name}</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
              <div>
                {model.images[0] ? (
                  <img src={model.images[0].url} alt={model.name} style={{ width: '100%', height: 'auto' }} />
                ) : (
                  <div style={{ width: '100%', height: '500px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Фото модели
                  </div>
                )}
              </div>
              
              <div>
                <div className="service-card" style={{ textAlign: 'left', padding: '30px' }}>
                  <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Параметры</h2>
                  
                  {model.height && (
                    <p style={{ marginBottom: '10px' }}><strong>Рост:</strong> {model.height} см</p>
                  )}
                  {model.bust && (
                    <p style={{ marginBottom: '10px' }}><strong>Обхват груди:</strong> {model.bust} см</p>
                  )}
                  {model.waist && (
                    <p style={{ marginBottom: '10px' }}><strong>Обхват талии:</strong> {model.waist} см</p>
                  )}
                  {model.hips && (
                    <p style={{ marginBottom: '10px' }}><strong>Обхват бедер:</strong> {model.hips} см</p>
                  )}
                  {model.hairColor && (
                    <p style={{ marginBottom: '10px' }}><strong>Цвет волос:</strong> {model.hairColor}</p>
                  )}
                  {model.shoeSize && (
                    <p style={{ marginBottom: '10px' }}><strong>Размер обуви:</strong> {model.shoeSize}</p>
                  )}
                  
                  {skills && (
                    <>
                      <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px' }}>Дополнительные навыки</h3>
                      {Object.entries(skills).map(([key, value]) => (
                        <p key={key} style={{ marginBottom: '5px' }}>
                          <strong>{key}:</strong> {String(value)}
                        </p>
                      ))}
                    </>
                  )}
                  
                  {model.categories.length > 0 && (
                    <>
                      <h3 style={{ fontSize: '18px', marginTop: '30px', marginBottom: '15px' }}>Категории</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {model.categories.map(cat => (
                          <Link 
                            key={cat.id} 
                            href={`/category-models/${cat.slug}`}
                            style={{ 
                              padding: '5px 15px', 
                              background: '#f0f0f0', 
                              borderRadius: '4px',
                              fontSize: '14px'
                            }}
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <div style={{ marginTop: '30px' }}>
                    <Link href="/contacts" className="btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                      Забронировать модель
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {model.images.length > 1 && (
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Портфолио</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  {model.images.slice(1).map(img => (
                    <img key={img.id} src={img.url} alt={img.alt || model.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  ))}
                </div>
              </div>
            )}

            {otherModels.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>Другие модели</h2>
                <div className="services-grid">
                  {otherModels.map(m => (
                    <Link key={m.id} href={`/model/${m.slug}`} className="model-card">
                      <div style={{ width: '100%', height: '250px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {m.images[0] ? (
                          <img src={m.images[0].url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span>Фото</span>
                        )}
                      </div>
                      <div className="model-info">
                        <h3 className="model-name">{m.name}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}



