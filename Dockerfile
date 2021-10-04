FROM node:14.15.0

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN yarn install

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

