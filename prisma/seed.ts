import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hashPassword('admin123')
  await prisma.user.upsert({
    where: { email: 'admin@getmodels.local' },
    update: {},
    create: {
      email: 'admin@getmodels.local',
      passwordHash: adminPassword,
      role: 'admin',
    },
  })

  // Create categories
  const categories = [
    { name: 'Девушки', slug: 'women', type: 'women', order: 1 },
    { name: 'Мужчины', slug: 'men', type: 'men', order: 2 },
    { name: 'Дети', slug: 'deti', type: 'kids', order: 3 },
    { name: 'Хостес', slug: 'hostes', type: 'hostes', order: 4 },
    { name: 'Стендистки', slug: 'stendistki', type: 'stendistki', order: 5 },
    { name: 'Промо модели', slug: 'promo-modeli', type: 'promo', order: 6 },
    { name: 'Тату', slug: 'tattoo', type: 'tattoo', order: 7 },
    { name: 'Экзотик', slug: 'exotic', type: 'exotic', order: 8 },
    { name: 'Гоу Гоу', slug: 'gogo', type: 'gogo', order: 9 },
    { name: 'Близнецы', slug: 'twins', type: 'twins', order: 10 },
    { name: 'Фитнес', slug: 'fitness', type: 'fitness', order: 11 },
    { name: 'Плюс сайз', slug: 'plussize', type: 'plussize', order: 12 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  // Create sample models
  const womenCategory = await prisma.category.findUnique({ where: { slug: 'women' } })
  
  if (womenCategory) {
    await prisma.model.upsert({
      where: { slug: 'ekaterina-120' },
      update: {},
      create: {
        name: 'Екатерина',
        slug: 'ekaterina-120',
        height: 174,
        bust: 84,
        waist: 59,
        hips: 89,
        skills: JSON.stringify({ english: 'Базовый' }),
        categories: { connect: [{ id: womenCategory.id }] },
      },
    })
  }

  // Create sample blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'kak-stat-modelyu' },
    update: {},
    create: {
      title: 'Как стать моделью?',
      slug: 'kak-stat-modelyu',
      excerpt: 'Пошаговая инструкция для начинающих моделей',
      content: 'Полная статья о том, как начать карьеру модели...',
      author: 'Photoroom',
    },
  })

  await prisma.blogPost.upsert({
    where: { slug: 'personal-na-meropriyatie' },
    update: {},
    create: {
      title: 'Персонал на мероприятие',
      slug: 'personal-na-meropriyatie',
      excerpt: 'Секреты подбора от профессионалов',
      content: 'Статья о подборе персонала для мероприятий...',
      author: 'Photoroom',
    },
  })

  // Create sample services with images
  const services = [
    { name: 'Модели для съемки', slug: 'shot-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '20000', hourly: '5000' }), order: 1, images: '/images/Девушки модели-Photoroom.png' },
    { name: 'Модели мужчины', slug: 'man-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 2, images: '/images/Мужчины модели-Photoroom.png' },
    { name: 'Дети модели', slug: 'kids-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 3, images: '/images/Дети модели-Photoroom.png' },
    { name: 'Модели для каталога одежды', slug: 'fotomodeli-dlya-marketpleysov', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '18000' }), order: 4, images: '/images/Модели_для_катологов_одежды_на_маркетплесах_Photoroom.png' },
    { name: 'Плюс сайз модели', slug: 'plussize-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 5, images: '/images/Плюс-сайз модели-Photoroom.png' },
    { name: 'Модели экзотик', slug: 'exotic-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 6, images: '/images/Модели экзотик-Photoroom.png' },
    { name: 'Тату модели', slug: 'tattoo-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 7, images: '/images/Тату модели-Photoroom.png' },
    { name: 'НЮ модели', slug: 'nu-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '18000' }), order: 8, images: '/images/НЮ модели-Photoroom.png' },
    { name: 'Хостес', slug: 'hostes-service', categoryGroup: 'events', priceInfo: JSON.stringify({ daily: '12000' }), order: 9, images: '/images/Хостес модели-Photoroom.png' },
    { name: 'Промо модели', slug: 'promo-service', categoryGroup: 'events', priceInfo: JSON.stringify({ daily: '12000' }), order: 10, images: '/images/Промо-модели-Photoroom.png' },
    { name: 'Модели для выезда', slug: 'body-service', categoryGroup: 'events', priceInfo: JSON.stringify({ base: '15000' }), order: 11, images: '/images/Боди-арт модели-Photoroom.png' },
    { name: 'Художник боди-арт', slug: 'painter-service', categoryGroup: 'events', priceInfo: JSON.stringify({ base: '12000' }), order: 12, images: '/images/Художник юоди-арт-Photoroom.png' },
    { name: 'Текильщицы', slug: 'tequila-service', categoryGroup: 'events', priceInfo: JSON.stringify({ daily: '12000' }), order: 13, images: '/images/Текильщицы.png' },
    { name: 'Танцовщицы Go Go', slug: 'gogo-service', categoryGroup: 'events', priceInfo: JSON.stringify({ shows: '12000' }), order: 14, images: '/images/Танцовщицы go go-Photoroom.png' },
    { name: 'Модели на показ', slug: 'podium-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '15000' }), order: 15, images: '/images/Модели на показ-Photoroom.png' },
    { name: 'Официанты модели', slug: 'barmen-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '10000' }), order: 16, images: '/images/Официанты-Photoroom.png' },
    { name: 'Модели для тусовки', slug: 'party-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '15000' }), order: 17, images: '/images/Модели для тусовки.png' },
    { name: 'Модели близнецы', slug: 'twins-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '20000' }), order: 18, images: '/images/Модели близнецы-Photoroom.png' },
    { name: 'Модели на выставку', slug: 'expo-service', categoryGroup: 'exhibitions', priceInfo: JSON.stringify({ daily: '12000' }), order: 19, images: '/images/Модели-стендистки.png' },
    { name: 'Стендистки', slug: 'stendist-service', categoryGroup: 'exhibitions', priceInfo: JSON.stringify({ daily: '12000' }), order: 20, images: '/images/Модели-стендистки.png' },
    { name: 'Переводчики', slug: 'translator-service', categoryGroup: 'exhibitions', priceInfo: JSON.stringify({ daily: '15000' }), order: 21, images: '/images/переводчики.png' },
    { name: 'Фитнес модели', slug: 'fitness-service', categoryGroup: 'sports', priceInfo: JSON.stringify({ base: '15000' }), order: 22, images: '/images/Фитнес модели-Photoroom.png' },
    { name: 'Ring girls', slug: 'ring-service', categoryGroup: 'sports', priceInfo: JSON.stringify({ event: '15000' }), order: 23, images: '/images/Ring girls.png' },
    { name: 'Grid girls', slug: 'grid-service', categoryGroup: 'sports', priceInfo: JSON.stringify({ event: '15000' }), order: 24, images: '/images/Ring girls.png' },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }

  // Create sample portfolio items
  await prisma.portfolio.upsert({
    where: { id: 'sample-1' },
    update: {},
    create: {
      id: 'sample-1',
      title: 'Презентация новых ванн компании BETTE',
      description: 'Хостес на презентации новой коллекции ванн',
      serviceType: 'hostes',
    },
  })

  await prisma.portfolio.upsert({
    where: { id: 'sample-2' },
    update: {},
    create: {
      id: 'sample-2',
      title: 'Бодиарт модели на выставке MOSBUILD',
      description: 'Яркие бодиарт модели украсили стенд на выставке',
      serviceType: 'bodyart',
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



