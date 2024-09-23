FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . /app/
RUN npm run build

FROM nginx:1.27.1-alpine AS serve
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/ngnix/nginx.conf

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"] Dont have to run it

# EXPOSE 5173
# CMD ["npm","run", "dev"]