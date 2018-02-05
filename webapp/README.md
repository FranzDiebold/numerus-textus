<img src="../images/readme/numerus-textus-Logo.png" width="15%" style="max-width:100%;" alt="numerus textus logo">

# numerus textus client app

[![Angular: v5](https://img.shields.io/badge/Angular-v5-DD0031.svg)](./numerus-textus/package.json)
<a href="https://www.numerus-textus.com" target="_blank"><img src="https://img.shields.io/badge/demo-online-2196F3.svg" alt="demo: online"></a>
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](./LICENSE.md)

> Check out the [live demo](https://www.numerus-textus.com)!

<img src="./images/readme/number2text_screenshot.jpg" width="60%" style="max-width:100%;" alt="number2text screenshot">

[Angular v5](https://github.com/angular/angular) app using the reactive libraries [@ngrx](https://github.com/ngrx/platform) and the [Bulma](https://bulma.io) CSS framework.

Angular concepts/techniques used:
- [Reactive Forms](https://angular.io/guide/reactive-forms)
- [RxJS v5.5](https://github.com/ReactiveX/rxjs) for advanced asynchronous programming with observable streams using the newly introduced (v5.5) ["pipeable operators"](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md).

[@ngrx](https://github.com/ngrx/platform) features used:
- [@ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) for state management
- [@ngrx/effects](https://github.com/ngrx/platform/blob/master/docs/effects/README.md) for side effects
- [@ngrx/router-store](https://github.com/ngrx/platform/blob/master/docs/router-store/README.md) for connecting the Angular router


## Main components

### number2text
<img src="./images/readme/number2text_screenshot.jpg" width="60%" style="max-width:100%;" alt="number2text screenshot">

The computation- and memory-intensive task of number to text conversion is performed by the [numerus textus API](../api/) in the backend, which provides a JSON API.

### text2number
<img src="./images/readme/text2number_screenshot.jpg" width="60%" style="max-width:100%;" alt="text2number screenshot">

Since the conversion from text to number is a trivial task it is done by the [`TextToNumberService`](./numerus-textus/src/app/numerus-textus/services/text-to-number) in the client app.

### about
User-centric description of the numerus textus project.


## 🎛 Configuration
In `src/environments/environment.[prod].ts` you may change the `apiEndpoint` of the corresponding backend and the `twitterAccount`:
```typescript
export const environment = {
  ...,
  apiEndpoint: 'https://api.numerus-textus.com',
  twitterAccount: 'numerustextus',
};
```

In `src/variables.scss` you may change the color scheme:
```scss
$color-primary: #2196F3;
$color-secondary: #21f37e;
```


## :pray: Tests
For running the tests:
```bash
npm install
ng test
```

Or just testing the app locally:

Serve app locally
```bash
npm install
ng serve
```
and run [Chrome](https://www.google.com/chrome/) in *disabled web security* mode (for enabling CORS) and in *incognito* mode (on macOS):
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security --user-data-dir -incognito
```
Your app is then running at [`http://localhost:4200`](http://localhost:4200).


## :rocket: Deployment
The numerus textus client Angular app is built and served using the [multi-stage build](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) Docker feature. Check out the respective [Dockerfile](./Dockerfile):
1. For building the Angular app (stage 1) via `npm run build-prod-i18n` a Node.js Alpine Docker image is used.
2. For serving the app (stage 2) a [nginx](https://nginx.org) webserver is employed. The nginx configuration can be found in [`nginx.conf`](./nginx.conf).



## :earth_africa: i18n
If you want to add a new language, i.e. french:

1. Run `ng xi18n --outputPath src/locale --locale en`.
2. Copy newly generated file `src/locale/messages.xlf` to `src/locale/messages.fr.xlf` and add `<target>...</target>` for each `<source>...</source>`.
3. Serve for test: `ng serve --aot --locale fr --i18n-format xlf --i18n-file src/locale/messages.fr.xlf`



## :ballot_box_with_check:️ TODOs
- [ ] Use Bulma v0.6.3 when published (warning messages in build process, [Bulma issue #1190](https://github.com/jgthms/bulma/issues/1190)).