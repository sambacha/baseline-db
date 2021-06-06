FROM node:16.3

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./src ./src
COPY ./test ./test
COPY ./.babelrc ./
RUN npm ci

EXPOSE 80
CMD npm start
