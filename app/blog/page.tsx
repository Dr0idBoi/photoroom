import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import BlogCard from '@/components/site/BlogCard'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  let posts: any[] = []
  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: 'desc' }
    })
    console.log('[Blog] Loaded posts:', posts.length)
  } catch (error) {
    console.error('[Blog] Error loading posts:', error)
  }

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



