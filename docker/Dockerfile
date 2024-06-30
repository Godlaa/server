FROM node:20.13.1-alpine

WORKDIR /app

# Установка необходимых пакетов для сборки нативных модулей
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Установка всех зависимостей внутри контейнера
RUN npm install -g --unsafe-perm

# Устанавливаем права доступа к node_modules
RUN chown -R node:node /app/node_modules

# Копируем исходный код
COPY . .

# Устанавливаем права на выполнение node-pre-gyp
RUN chmod +x /app/node_modules/.bin/node-pre-gyp

# Выполняем npm rebuild от имени пользователя node
USER node
RUN npm rebuild bcrypt --build-from-source

EXPOSE 5000
CMD ["npm", "run", "dev"]
