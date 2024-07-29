FROM node:14 as build

MAINTAINER aedemirsen

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:stable-alpine

COPY - from=build /app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]