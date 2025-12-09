import Link from 'next/link'
import { getServiceImage } from '@/lib/service-images'

interface ServiceCardProps {
  service: {
    name: string
    slug: string
    priceInfo?: string | null
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  let priceText = 'от 12 000 рублей'
  
  if (service.priceInfo) {
    try {
      const prices = JSON.parse(service.priceInfo)
      if (prices.base) priceText = `от ${prices.base} рублей`
      else if (prices.daily) priceText = `от ${prices.daily} рублей/день`
      else if (prices.hourly) priceText = `${prices.hourly} руб/час`
    } catch (e) {
      // Use default
    }
  }
  
  const imageUrl = getServiceImage(service.slug)
  
  return (
    <Link href={`/${service.slug}`} className="service-card">
      <div style={{ 
        width: '100%', 
        height: '200px', 
        position: 'relative',
        marginBottom: '15px',
        overflow: 'hidden',
        borderRadius: '8px',
        background: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src={imageUrl} 
          alt={service.name}
          style={{ 
            maxWidth: '100%', 
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
      <h3>{service.name}</h3>
      <p className="service-price">{priceText}</p>
    </Link>
  )
}



