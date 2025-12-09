import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'

export default function VacanciesPage() {
  const vacancies = [
    {
      title: 'Модельный скаут',
      description: 'Поиск и отбор новых моделей для агентства. Опыт работы в модельной индустрии приветствуется.',
      requirements: ['Знание модельной индустрии', 'Коммуникабельность', 'Опыт от 1 года'],
    },
    {
      title: 'Стилист-визажист',
      description: 'Подготовка моделей к съемкам и мероприятиям. Работа с различными стилями и образами.',
      requirements: ['Профессиональное образование', 'Портфолио работ', 'Опыт от 2 лет'],
    },
  ]

  return (
    <>
      <link rel="stylesheet" href="/styles/site.css" />
      <Header />
      
      <main>
        <section className="services-section">
          <h1 className="section-title">Вакансии</h1>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {vacancies.map((vacancy, idx) => (
              <div key={idx} className="service-card" style={{ 
                marginBottom: '30px', 
                textAlign: 'left',
                padding: '40px'
              }}>
                <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>{vacancy.title}</h2>
                <p style={{ marginBottom: '20px', color: '#666' }}>{vacancy.description}</p>
                
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Требования:</h3>
                <ul style={{ paddingLeft: '20px', color: '#666' }}>
                  {vacancy.requirements.map((req, i) => (
                    <li key={i} style={{ marginBottom: '5px' }}>{req}</li>
                  ))}
                </ul>
                
                <div style={{ marginTop: '20px' }}>
                  <a href="/contacts" className="btn-primary">Откликнуться</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}



