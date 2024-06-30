FROM node:20.13.1-alpine

WORKDIR /app

# Установка необходимых пакетов для сборки нативных модулей
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Установка всех зависимостей внутри контейнера
RUN npm install

COPY . .

# Пересборка bcrypt для правильной архитектуры
RUN npm rebuild bcrypt --build-from-source

EXPOSE 5000
CMD ["npm", "run", "dev"]
