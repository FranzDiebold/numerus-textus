FROM node:9.11-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./numerus-textus-chatbot/ /usr/src/app
RUN npm install --silent

CMD [ "node", "src/server.js" ]