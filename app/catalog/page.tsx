import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function CatalogPage() {
  let categories: any[] = []
  try {
    categories = await prisma.category.findMany({
      include: {
        models: {
          take: 4,
          include: {
            images: { take: 1, orderBy: { order: 'asc' } }
          }
        }
      },
      orderBy: { order: 'asc' }
    })
    console.log('[Catalog] Loaded categories:', categories.length)
  } catch (error) {
    console.error('[Catalog] Error loading categories:', error)
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Каталог моделей</h1>
          
          {categories.map(category => (
            <div key={category.id} style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '28px' }}>{category.name}</h2>
                <Link href={`/category-models/${category.slug}`} style={{ fontSize: '16px', textDecoration: 'underline' }}>
                  Смотреть больше →
                </Link>
              </div>
              
              <div className="services-grid">
                {category.models.slice(0, 4).map(model => (
                  <Link key={model.id} href={`/model/${model.slug}`} className="model-card">
                    <div style={{ 
                      width: '100%', 
                      height: '350px', 
                      background: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {model.images[0] ? (
                        <img src={model.images[0].url} alt={model.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span>Фото модели</span>
                      )}
                    </div>
                    <div className="model-info">
                      <h3 className="model-name">{model.name}</h3>
                      {model.height && (
                        <p className="model-params">Рост: {model.height} см</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              
              {category.models.length === 0 && (
                <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
                  В этой категории пока нет моделей
                </p>
              )}
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  )
}



