import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
    include: {
      models: {
        include: {
          images: { take: 1, orderBy: { order: 'asc' } }
        }
      }
    }
  }).catch(() => null)

  if (!category) {
    notFound()
  }

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">{category.name}</h1>
          {category.description && (
            <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '40px', color: '#666' }}>
              {category.description}
            </p>
          )}
          
          <div className="services-grid">
            {category.models.map(model => (
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
        </section>
      </main>

      <Footer />
    </>
  )
}



