# ⚡ Быстрый деплой на сервер

## За 5 минут

### 1️⃣ На локальной машине

```bash
# Инициализируем Git (если еще не сделано)
git init
git add .
git commit -m "Initial commit"

# Создаем репозиторий на GitHub и пушим
git remote add origin https://github.com/ваш_username/photoroom.git
git branch -M main
git push -u origin main
```

### 2️⃣ На сервере

```bash
# Устанавливаем Docker (если не установлен)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Клонируем проект
cd /var/www
git clone https://github.com/ваш_username/photoroom.git
cd photoroom

# Создаем директории и даем права
mkdir -p data public/images/uploads nginx/ssl
chmod 755 data public/images/uploads
chmod +x deploy.sh

# ДЕПЛОИМ!
./deploy.sh
```

### 3️⃣ Готово! 🎉

Приложение доступно на `http://ваш_сервер_ip:3000`

Вход в админку:
- URL: `http://ваш_сервер_ip:3000/admin/login`
- Email: `admin@getmodels.local`
- Пароль: `admin123`

---

## Обновление проекта

### На локальной машине:
```bash
git add .
git commit -m "Ваши изменения"
git push origin main
```

### На сервере:
```bash
cd /var/www/photoroom
./deploy.sh
```

---

## Важные команды

```bash
# Логи
docker compose logs -f photoroom

# Перезапуск
docker compose restart

# Остановка
docker compose down

# Статус
docker compose ps
```

---

## Что дальше?

1. **SSL сертификат:** Смотри `DEPLOYMENT.md` раздел "Настройка SSL"
2. **Домен:** Настрой DNS на IP сервера
3. **Безопасность:** Измени пароль админа через админку
4. **Мониторинг:** Настрой логирование и алерты

Подробная инструкция в файле `DEPLOYMENT.md` 📚

