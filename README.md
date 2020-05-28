# MAS-RAD | CAS-DAR | Advanced Front-end Development (DFA)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Prerequisite](#prerequisite)
- [Plan](#plan)
- [Additional concepts and tools](#additional-concepts-and-tools)
- [Documentation](#documentation)
- [Useful links](#useful-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

The goal of this course is to discover concepts and tools to organize the front-end side of a web application and enrich the user interface/experience according to current good practices.

You will:

- learn how to make good use of a CSS framework to build a responsive HTML user interface
- learn (or review) how to manipulate the DOM API with or without a library
- learn how to manage asynchronous communications with a Web API on the back end
- learn how the use of a framework does help to organize the front-end code of a single page application
- be introduced to frameworks that help you develop and build your web application for multiple devices

_This course uses subjects from or based on [COMEM+][comem] [architecture & deployment][comem-archidep], [web-oriented architecture][comem-archioweb] and [mobile development][comem-devmobil] courses taught to students of [Media Engineering][im] at [HEIG-VD][heig]._

## Prerequisite

- Basics of HTML, CSS and JavaScript
- Use of [command line][cli]
- Use of [Git][git], [Git branching][git-b] and [Collaborating with Git on GitHub][collab]

## Plan

- [Introduction][dfa]
- [Setting up your environment][setup]

- Bootstrap
  - [Getting started][bb]
  - [Layout management][blm] ([practice][bex])

- JavaScript
  - [Basics and more][js-bas]

- DOM Manipulation
  - [With JavaScript][js-dom]
  - [With jQuery][jq-dom]

- Web Service and asynchronous operations
  - [RESTful APIs][rest]
  - [Basic Promises][js-prom-basic]
  - [Observables with Rxjs][rxjs]

- [Modular JavaScript][js-modules] ([practice][js-mod-practice])

- [TypeScript][ts]

- Angular
  - [Angular CLI][ng-cli]
  - [Getting started][ng] ([practice][ng-exercise])
  <!-- - [Navigation & Routing][ng-ui-router] ([exercise][ng-ui-router-exercise]) -->

- Angular & Libraries
  <!-- - [Angular Bootstrap][ng-bootstrap] -->
  <!-- - [Angular Geolocation][geo-api] -->
  <!-- - [Angular Leaflet][ng-leaflet] -->

- Web application project
  <!-- - [Angular Auth Starter][ng-starter] -->

## Additional concepts and tools

- [Node Package Manager (npm)][npm]

- [JavaScript Closures][js-clos]
- [JavaScript Prototypes][js-prot]
- [JavaScript ES6 Classes][js-classes]
- [Advanced Promises][js-prom]

- [SOP & CORS][sop-cors]

<!-- - [Angular Geolocation][geo-api] -->
<!-- - [Angular Leaflet][angular-leafet] -->

## Documentation

- [Citizen Engagement API][citizen-engagement-api-docs]
- [Travel Log API][travel-log-api-docs]

## Useful links

- [Citizen Engagement API][citizen-engagement-api] (implementation & docs source)
- [REST demonstration API][rest-demo] (implementation & docs source) used in the RESTful APIs exercise

[angular-leafet]: https://mediacomem.github.io/comem-archidep/latest/subjects/angular-leaflet/
[api-call]: subjects/api-call
[bb]: subjects/bootstrap
[blm]: subjects/bootstrap-layout-management
[bex]: subjects/bootstrap-practice
[citizen-engagement-api]: https://github.com/MediaComem/comem-citizen-engagement-api
[citizen-engagement-api-docs]: https://mediacomem.github.io/comem-citizen-engagement-api/
[cli]: https://mediacomem.github.io/comem-archidep/latest/subjects/cli/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[comem]: http://www.heig-vd.ch/comem
[comem-archioweb]: https://mediacomem.github.io/comem-archioweb/latest/
[comem-archidep]: https://mediacomem.github.io/comem-archidep/latest/
[comem-devmobil]: https://mediacomem.github.io/comem-devmobil/latest/
[collab]: https://mediacomem.github.io/comem-archidep/latest/subjects/git-collaborating?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[dfa]: subjects/intro
[git]: https://mediacomem.github.io/comem-archidep/latest/subjects/git/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[git-b]: https://mediacomem.github.io/comem-archidep/latest/subjects/git-branching?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[geo-api]: subjects/angular-geolocation/
[heig]: http://www.heig-vd.ch
[im]: https://heig-vd.ch/formations/bachelor/filieres/ingenierie-des-medias
[jq-dom]: subjects/jquery-dom
[js-ajax]: subjects/js-ajax
[js-bas]: subjects/js
[js-classes]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-classes/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-clos]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-closures/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-dom]: subjects/js-dom
[js-mod-practice]: https://github.com/Tazaf/masrad-dfa-js-module-practice
[js-modules]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-modules?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-prom]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-promises/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-prom-basic]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-promises-basics/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-prot]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-prototypes/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[mapbox]: https://www.mapbox.com/mapbox.js/api/v3.0.1/
[ng]: https://mediacomem.github.io/comem-devmobil/latest/subjects/angular/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[ng-cli]: subjects/angular-cli
[ng-bootstrap]: subjects/angular-ui-bootstrap
[ng-exercise]: https://github.com/Tazaf/masrad-dfa-angular-starter-practice
[ng-prom]: subjects/angular-promises
[ng-starter]: subjects/angular-auth-starter/
[ng-ui-router]: subjects/angular-ui-router
[ng-ui-router-exercise]: https://github.com/MediaComem/comem-webdev-angular-ui-router-exercise
[npm]: https://mediacomem.github.io/comem-archioweb/2019-2020/subjects/npm/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[rest]: https://mediacomem.github.io/comem-archioweb/latest/subjects/rest/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[rest-demo]: https://github.com/MediaComem/comem-webdev-express-rest-demo
[rxjs]: https://mediacomem.github.io/comem-devmobil/latest/subjects/rxjs/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[setup]: subjects/setup
[sop-cors]: subjects/sop-cors
[travel-log-api-docs]: https://comem-travel-log-api.herokuapp.com/
[ts]: https://mediacomem.github.io/comem-devmobil/latest/subjects/ts/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
