FROM node:23.5.0

# Cập nhật và cài đặt Vim
RUN apt-get update && apt-get install -y vim

WORKDIR /app

COPY ./nextjs/package.json /app/package.json

RUN npm install

COPY ./nextjs /app

EXPOSE 3000

CMD ["npm", "run", "dev"]