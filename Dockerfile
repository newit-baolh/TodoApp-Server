FROM node:14-alpine

LABEL version="1.0"
LABEL description = "Todolist image nodejs"
LABEL maintainer = ["baolh.newit"]

# App directory
WORKDIR /src/app

COPY package*.json ./

RUN yarn install && yarn add sequelize-cli -g

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
