FROM node:lts-alpine

WORKDIR /app

COPY package*.json .
COPY *.lock .

RUN yarn

COPY . .

CMD [ "yarn" , "start"]