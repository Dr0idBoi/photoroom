import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')
  
  // Create admin user
  const adminPassword = await hashPassword('admin123')
  
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@klicme.ru' }
  })
  
  if (existingUser) {
    await prisma.user.update({
      where: { email: 'admin@klicme.ru' },
      data: { passwordHash: adminPassword }
    })
    console.log('✓ Admin user password updated')
  } else {
    await prisma.user.create({
      data: {
        email: 'admin@klicme.ru',
        passwordHash: adminPassword,
        role: 'admin',
      }
    })
    console.log('✓ Admin user created')
  }

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
      update: { name: cat.name, type: cat.type, order: cat.order },
      create: cat,
    })
  }
  console.log('✓ Categories created/updated')

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
  console.log('✓ Sample models created')

  // Create sample blog posts
  await prisma.blogPost.upsert({
    where: { slug: 'kak-stat-modelyu' },
    update: {},
    create: {
      title: 'Как стать моделью?',
      slug: 'kak-stat-modelyu',
      excerpt: 'Пошаговая инструкция для начинающих моделей',
      content: 'Полная статья о том, как начать карьеру модели...',
      author: 'Klic me',
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
      author: 'Klic me',
    },
  })
  console.log('✓ Blog posts created')

  // Create sample services with images
  const services = [
    { name: 'Модели для съемки', slug: 'shot-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '20000', hourly: '5000' }), order: 1, images: '/images/Девушки модели-Klic me.png' },
    { name: 'Модели мужчины', slug: 'man-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 2, images: '/images/Мужчины модели-Klic me.png' },
    { name: 'Дети модели', slug: 'kids-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 3, images: '/images/Дети модели-Klic me.png' },
    { name: 'Модели для каталога одежды', slug: 'fotomodeli-dlya-marketpleysov', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '18000' }), order: 4, images: '/images/Модели_для_катологов_одежды_на_маркетплесах_Klic me.png' },
    { name: 'Плюс сайз модели', slug: 'plussize-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 5, images: '/images/Плюс-сайз модели-Klic me.png' },
    { name: 'Модели экзотик', slug: 'exotic-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 6, images: '/images/Модели экзотик-Klic me.png' },
    { name: 'Тату модели', slug: 'tattoo-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '15000' }), order: 7, images: '/images/Тату модели-Klic me.png' },
    { name: 'НЮ модели', slug: 'nu-service', categoryGroup: 'shooting', priceInfo: JSON.stringify({ base: '18000' }), order: 8, images: '/images/НЮ модели-Klic me.png' },
    { name: 'Хостес', slug: 'hostes-service', categoryGroup: 'events', priceInfo: JSON.stringify({ daily: '12000' }), order: 9, images: '/images/Хостес модели-Klic me.png' },
    { name: 'Промо модели', slug: 'promo-service', categoryGroup: 'events', priceInfo: JSON.stringify({ daily: '12000' }), order: 10, images: '/images/Промо-модели-Klic me.png' },
    { name: 'Модели для выезда', slug: 'body-service', categoryGroup: 'events', priceInfo: JSON.stringify({ base: '15000' }), order: 11, images: '/images/Боди-арт модели-Klic me.png' },
    { name: 'Художник боди-арт', slug: 'painter-service', categoryGroup: 'events', priceInfo: JSON.stringify({ base: '12000' }), order: 12, images: '/images/Художник юоди-арт-Klic me.png' },
    { name: 'Текильщицы', slug: 'tequila-service', categoryGroup: 'events', priceInfo: JSON.stringify({ daily: '12000' }), order: 13, images: '/images/Текильщицы.png' },
    { name: 'Танцовщицы Go Go', slug: 'gogo-service', categoryGroup: 'events', priceInfo: JSON.stringify({ shows: '12000' }), order: 14, images: '/images/Танцовщицы go go-Klic me.png' },
    { name: 'Модели на показ', slug: 'podium-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '15000' }), order: 15, images: '/images/Модели на показ-Klic me.png' },
    { name: 'Официанты модели', slug: 'barmen-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '10000' }), order: 16, images: '/images/Официанты-Klic me.png' },
    { name: 'Модели для тусовки', slug: 'party-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '15000' }), order: 17, images: '/images/Модели для тусовки.png' },
    { name: 'Модели близнецы', slug: 'twins-service', categoryGroup: 'events', priceInfo: JSON.stringify({ event: '20000' }), order: 18, images: '/images/Модели близнецы-Klic me.png' },
    { name: 'Модели на выставку', slug: 'expo-service', categoryGroup: 'exhibitions', priceInfo: JSON.stringify({ daily: '12000' }), order: 19, images: '/images/Модели-стендистки.png' },
    { name: 'Стендистки', slug: 'stendist-service', categoryGroup: 'exhibitions', priceInfo: JSON.stringify({ daily: '12000' }), order: 20, images: '/images/Модели-стендистки.png' },
    { name: 'Переводчики', slug: 'translator-service', categoryGroup: 'exhibitions', priceInfo: JSON.stringify({ daily: '15000' }), order: 21, images: '/images/переводчики.png' },
    { name: 'Фитнес модели', slug: 'fitness-service', categoryGroup: 'sports', priceInfo: JSON.stringify({ base: '15000' }), order: 22, images: '/images/Фитнес модели-Klic me.png' },
    { name: 'Ring girls', slug: 'ring-service', categoryGroup: 'sports', priceInfo: JSON.stringify({ event: '15000' }), order: 23, images: '/images/Ring girls.png' },
    { name: 'Grid girls', slug: 'grid-service', categoryGroup: 'sports', priceInfo: JSON.stringify({ event: '15000' }), order: 24, images: '/images/Ring girls.png' },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { 
        name: service.name, 
        categoryGroup: service.categoryGroup, 
        priceInfo: service.priceInfo, 
        order: service.order, 
        images: service.images 
      },
      create: service,
    })
  }
  console.log('✓ Services created/updated')

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
  console.log('✓ Portfolio items created')

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



