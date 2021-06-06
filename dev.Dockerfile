FROM node:16.3

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

EXPOSE 80
CMD npm run dev
