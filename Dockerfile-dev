FROM node:20.9-alpine3.18

RUN mkdir /server

WORKDIR /server

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "npm", "run", "start-dev" ]
