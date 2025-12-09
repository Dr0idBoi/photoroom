import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  }).catch(() => null)

  if (!post) {
    notFound()
  }

  const otherPosts = await prisma.blogPost.findMany({
    where: { id: { not: post.id } },
    take: 3,
    orderBy: { publishedAt: 'desc' }
  }).catch(() => [])

  const date = new Date(post.publishedAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <article style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="section-title" style={{ fontSize: '36px' }}>{post.title}</h1>
            
            <div style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
              <p>{date}</p>
              {post.author && <p>Автор: {post.author}</p>}
            </div>

            {post.featuredImage && (
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                style={{ width: '100%', height: 'auto', marginBottom: '40px' }} 
              />
            )}

            <div 
              style={{ 
                fontSize: '18px', 
                lineHeight: '1.8',
                color: '#333'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {otherPosts.length > 0 && (
            <div style={{ marginTop: '80px' }}>
              <h2 style={{ fontSize: '28px', textAlign: 'center', marginBottom: '30px' }}>
                Вам будет интересно
              </h2>
              <div className="services-grid">
                {otherPosts.map(p => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="service-card">
                    <h3>{p.title}</h3>
                    {p.excerpt && <p style={{ marginTop: '15px', color: '#666' }}>{p.excerpt}</p>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}



