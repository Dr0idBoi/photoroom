import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import BlogCard from '@/components/site/BlogCard'
import { prisma } from '@/lib/prisma'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' }
  }).catch(() => [])

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Блог модельного агентства</h1>
          
          <div className="services-grid">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
              Статьи скоро появятся
            </p>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}



