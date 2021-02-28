FROM node:14.16.0-alpine3.10

RUN apk add --no-cache imagemagick ffmpeg

ADD package.json .
ADD package-lock.json .

RUN npm install
