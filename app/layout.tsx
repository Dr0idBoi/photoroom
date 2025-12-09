import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klic me - Модельное агентство Москвы',
  description: 'Модельное агентство Москвы, которое предлагает широкий спектр комплексных услуг в сфере подбора моделей на событийные мероприятия.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}



