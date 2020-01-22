FROM node:13.6.0-alpine3.11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./numerus-textus-chatbot/ /usr/src/app
RUN npm install --silent

CMD [ "node", "src/server.js" ]