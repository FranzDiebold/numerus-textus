<img src="../images/readme/numerus-textus-Logo.png" width="15%" style="max-width:100%;" alt="numerus textus logo">

# numerus textus chatbot

<a href="http://t.me/NumTexBot" target="_blank"><img src="https://img.shields.io/badge/chat-Telegram-32afed.svg" alt="chat: Telegram"></a>
<a href="https://bot.dialogflow.com/numerus-textus" target="_blank"><img src="https://img.shields.io/badge/chat-Web-ed6c1f.svg" alt="chat: Web"></a>
<a href="http://m.me/numerustextus" target="_blank"><img src="https://img.shields.io/badge/chat-Facebook--Messenger-3B5998.svg" alt="chat: Facebook Messenger"></a>
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

<img src="./images/readme/chatbot_telegram_screenshot.jpg" width="35%" style="max-width:100%;" alt="numerus textus chatbot screenshot">

numerus textus chatbot is the backend API for the **chatbot** for the numerus textus app. It is a [Node.js](https://nodejs.org) app using the following packages:
- [restify](https://github.com/restify/node-restify) for providing the RESTful interface.
- [restify-clients](https://github.com/restify/clients) for making requests to the numerus textus number2text API.
- [restify-errors](https://github.com/restify/errors) for handling HTTP errors.

For handling the natural language processing (NLP) and the connections the numerous chat services ([Facebook Messenger](https://www.messenger.com), [Slack](https://slack.com), [Telegram](https://telegram.org), [Skype](https://www.skype.com)) the [Dialogflow](https://dialogflow.com) platform is used.



## [Dialogflow](https://dialogflow.com)
#### Intents, Actions & Parameters
The following intents, [actions and parameters](https://dialogflow.com/docs/actions-and-parameters) are defined in Dialogflow:
- `number2text` for number to text conversion
- `text2number` for text to number conversion
- `help` for a ultra-short tutorial how to use the chatbot
- `smalltalk.*`: Imported intents from prebuilt [Small Talk](https://dialogflow.com/docs/reference/small-talk) agent

#### Entities
For the `number2text` and `text2number` actions the following prebuilt [system entities](https://dialogflow.com/docs/reference/system-entities) are used:
- `@sys.number-integer` for number to text conversion
- `@sys.any` for text to number conversion



## :dart: API endpoint

[webhook/fulfillment](https://dialogflow.com/docs/fulfillment)

#### https://chatbot.numerus-textus.com
`POST`



## :rocket: Deployment
The app is deployed using Docker ([Dockerfile](./Dockerfile)).



## :ballot_box_with_check:️ Problems/TODOs
- [ ] More training for the chatbot
- [ ] Add german language
- [ ] Include exported Dialogflow agent (ZIP file)
- [ ] A Dialogflow webhook call has a timeout of just 5 seconds, which is too short for complex number2text calls. Maybe this could be done asynchronously?
- [ ] Add a joke intent :grin:
