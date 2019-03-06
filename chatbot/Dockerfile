FROM node:11.10.1-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./numerus-textus-chatbot/ /usr/src/app
RUN npm install --silent

CMD [ "node", "src/server.js" ]