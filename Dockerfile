FROM node:20.18-alpine3.20
WORKDIR /app
COPY package*.json  /app/
RUN npm i \
    && apk update \
    && apk add vim
COPY . .
EXPOSE 3000
CMD npm start