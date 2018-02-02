<img src="../images/readme/numerus-textus-Logo.png" width="15%" style="max-width:100%;" alt="numerus textus logo">

# numerus textus chatbot

<a href="https://www.numerus-textus.com" target="_blank"><img src="https://img.shields.io/badge/demo-online-2196F3.svg" alt="demo: online"></a>
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

numerus textus chatbot is the backend API for the **chatbot** for the numerus textus app. It is a [Node.js](https://nodejs.org) app using the following packages:
- [restify](https://github.com/restify/node-restify) for providing the RESTful interface.
- [restify-clients](https://github.com/restify/clients) for making requests to the numerus textus number2text API.
- [restify-errors](https://github.com/restify/errors) for handling HTTP errors.

For handling the natural language processing (NLP) and the connections the numerous chat services ([Facebook Messenger](https://www.messenger.com), [Slack](https://slack.com), [Telegram](https://telegram.org), [Skype](https://www.skype.com)) the [Dialogflow](https://dialogflow.com) platform is used.



## [Dialogflow](https://dialogflow.com)
#### Intents & Actions
- `number2text`
- `text2number`

#### Entities
- `@sys.number-integer`
- `@sys.any`



## :dart: API endpoint

#### https://chatbot.numerus-textus.com
`POST`



## :rocket: Deployment
The app is deployed using Docker ([Dockerfile](./Dockerfile)).



## :ballot_box_with_check:️ Problems/TODOs
- [ ] More training for the chatbot
- [ ] Include exported Dialogflow agent (ZIP file)
- [ ] A Dialogflow webhook call has a timeout of just 5 seconds, which is too short for complex number2text calls. Maybe this could be done asynchronously?
- [ ] Add a joke intent :grin:
