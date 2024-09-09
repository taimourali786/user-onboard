FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . /app/
EXPOSE 5173
CMD ["npm","run", "dev"]