FROM node:23.5.0

# Cập nhật và cài đặt Vim
RUN apt-get update && apt-get install -y vim

WORKDIR /app

COPY ./nestjs/package.json /app/package.json

RUN npm install

COPY ./nestjs /app

EXPOSE 3008

CMD ["npm", "run", "start:dev"]