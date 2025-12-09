# Stage 1: Dependencies
FROM node:20-alpine AS deps

# Устанавливаем зависимости для Prisma и сборки
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем зависимости
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Копируем node_modules из deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем Next.js приложение
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Устанавливаем необходимые пакеты для production
RUN apk add --no-cache openssl libc6-compat

# Создаём пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Настройки окружения
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Копируем публичные файлы
COPY --from=builder /app/public ./public

# Копируем standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Копируем Prisma файлы и клиент
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Копируем bcryptjs для аутентификации
COPY --from=builder /app/node_modules/bcryptjs ./node_modules/bcryptjs

# Создаём директории для данных и загрузок
RUN mkdir -p /app/data /app/public/images/uploads
RUN chown -R nextjs:nodejs /app/data /app/public/images/uploads

# Переключаемся на непривилегированного пользователя
USER nextjs

EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/auth/session || exit 1

# Запуск приложения
CMD ["node", "server.js"]
