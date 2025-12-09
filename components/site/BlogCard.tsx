import Link from 'next/link'

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt?: string | null
    publishedAt: Date
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  return (
    <Link href={`/blog/${post.slug}`} className="service-card">
      <h3>{post.title}</h3>
      {post.excerpt && <p style={{ marginTop: '15px', color: '#666' }}>{post.excerpt}</p>}
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>{date}</p>
    </Link>
  )
}



