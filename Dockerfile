FROM node:11-alpine

WORKDIR /opt/rxsto/sentinel

RUN apk update && apk upgrade && apk add --no-cache git

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]
