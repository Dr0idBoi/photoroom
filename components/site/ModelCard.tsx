import Link from 'next/link'
import Image from 'next/image'

interface ModelCardProps {
  model: {
    id: string
    name: string
    slug: string
    height?: number | null
    bust?: number | null
    waist?: number | null
    hips?: number | null
    images?: { url: string; alt?: string | null }[]
  }
}

export default function ModelCard({ model }: ModelCardProps) {
  const mainImage = model.images?.[0]?.url || '/images/placeholder-model.jpg'
  const params = []
  
  if (model.height) params.push(`${model.height} см`)
  if (model.bust && model.waist && model.hips) {
    params.push(`${model.bust}/${model.waist}/${model.hips}`)
  }
  
  return (
    <Link href={`/model/${model.slug}`} className="model-card">
      <div style={{ position: 'relative', width: '100%', height: '350px' }}>
        <Image
          src={mainImage}
          alt={model.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="model-info">
        <h3 className="model-name">{model.name}</h3>
        {params.length > 0 && (
          <p className="model-params">{params.join(' • ')}</p>
        )}
      </div>
    </Link>
  )
}



