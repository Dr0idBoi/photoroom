// Маппинг slug услуги -> путь к изображению
export const serviceImages: Record<string, string> = {
  'shot-service': '/images/Девушки модели-Photoroom.png',
  'man-service': '/images/Мужчины модели-Photoroom.png',
  'kids-service': '/images/Дети модели-Photoroom.png',
  'hostes-service': '/images/Хостес модели-Photoroom.png',
  'expo-service': '/images/Модели-стендистки.png',
  'stendist-service': '/images/Модели-стендистки.png',
  'body-service': '/images/Модели для тусовки.png',
  'painter-service': '/images/Художник юоди-арт-Photoroom.png',
  'barmen-service': '/images/Официанты-Photoroom.png',
  'bar-service': '/images/Официанты-Photoroom.png',
  'podium-service': '/images/Модели на показ-Photoroom.png',
  'party-service': '/images/Модели для тусовки.png',
  'exotic-service': '/images/Модели экзотик-Photoroom.png',
  'fitness-service': '/images/Фитнес модели-Photoroom.png',
  'ring-service': '/images/Ring girls.png',
  'grid-service': '/images/Ring girls.png',
  'promo-service': '/images/Промо-модели-Photoroom.png',
  'gogo-service': '/images/Танцовщицы go go-Photoroom.png',
  'tequila-service': '/images/Текильщицы.png',
  'twins-service': '/images/Модели близнецы-Photoroom.png',
  'tattoo-service': '/images/Тату модели-Photoroom.png',
  'translator-service': '/images/переводчики.png',
  'plussize-service': '/images/Плюс-сайз модели-Photoroom.png',
  'nu-service': '/images/НЮ модели-Photoroom.png',
  'fotomodeli-dlya-marketpleysov': '/images/Модели_для_катологов_одежды_на_маркетплесах_Photoroom.png',
}

export function getServiceImage(slug: string): string {
  return serviceImages[slug] || '/images/placeholder-model.jpg'
}

