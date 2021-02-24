FROM node:12.21-buster-slim

RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
