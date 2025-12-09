import Link from 'next/link'
import Footer from '@/components/site/Footer'

export default function EnglishPage() {
  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      
      <header className="site-header">
        <div className="nav-container">
          <Link href="/" className="logo">Klic me</Link>
          <nav className="nav-links">
            <a href="tel:+79857438748" className="phone-link">+7 (985) 743 87 48</a>
            <div className="lang-switcher">
              <Link href="/">ru</Link>
              <span>/</span>
              <Link href="/eng">en</Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="hero-section">
          <h1 className="hero-title">MODELING AGENCY</h1>
          <h2 className="hero-subtitle">Beautiful models for your projects</h2>
        </section>

        <section className="services-section">
          <h2 className="section-title">Our Services</h2>
          
          <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>
              Klic me is a Moscow-based modeling agency offering a wide range of comprehensive services 
              in the field of personnel selection for event activities.
            </p>

            <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '20px' }}>Services Include:</h3>
            <ul style={{ paddingLeft: '20px', fontSize: '16px' }}>
              <li style={{ marginBottom: '10px' }}>Models for photo and video shoots</li>
              <li style={{ marginBottom: '10px' }}>Hostesses for events and exhibitions</li>
              <li style={{ marginBottom: '10px' }}>Promotional staff</li>
              <li style={{ marginBottom: '10px' }}>Body art models</li>
              <li style={{ marginBottom: '10px' }}>Ring girls and grid girls</li>
              <li style={{ marginBottom: '10px' }}>Fashion show models</li>
            </ul>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <Link href="/contacts" className="btn-primary">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}



