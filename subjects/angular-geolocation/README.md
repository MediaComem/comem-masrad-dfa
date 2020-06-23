# Geolocation

<!-- slide-front-matter class: center, middle -->

## Summary

Get started with the Geolocation API in your Angular application.

<!-- slide-include ../../BANNER.md -->

**You will need**

- [Google Chrome][chrome] (recommended, any browser with developer tools will do)
- [Visual Studio Code][vscode] (recommended, although any editor could do)

**Recommanded readings**

- [Advanced Promises][js-prom]
- [Observables with Rxjs][rxjs]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [The API](#the-api)
- [The service](#the-service)
- [Getting the position](#getting-the-position)
  - [Explanations](#explanations)
  - [Usage](#usage)
- [Watching the position](#watching-the-position)
  - [Explanations](#explanations-1)
  - [Usage](#usage-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The API

The [Geolocation API][geolocation-api] is an HTML5 API, natively accessible in [all modern browsers][caniuse-geoapi].

**It's NOT specific to Angular and can be used in any JS-based application running on a browser.**

> Don't hesitate to read the [API documentation][geolocation-api]

In this subject, we will create an **Angular service** that uses this native API and add some syntactic sugar around it.

The API is primarily composed of two methods, both using simple callbacks:

- One that allows you to get the user's position once
  > We'll use **Promises** here instead of basic callbacks
- One that allows you to watch the user's position over time
  > We'll use **Observables** here instead of basic callbacks

> **NOTE that using the Geolocation API is only possible if the end user allows you to do so!**

## The service

Let's create the service in our app using the Angular CLI:

> You can create this service anywhere in your app. We'll create it in a `shared/services` folder.

```bash
$> ng generate service shared/services/Geolocation
```

Now, when we instantiate the service, we need to make sure that the browser the app is running on has the Geolocation API. We do this by [checking for the existence][navigator.geolocation] of the `geolocation` property in the `navigator` global object.

We'll create a flag in our service for that (for later use in the methods):

```ts
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class GeolocationService {
* private hasApi: boolean;

  constructor() {
*   this.hasApi = "geolocation" in navigator;
  }
}
```

## Getting the position

Ponctually getting the current user location is done calling the Geolocation API's [`getCurrentPosition(...)` method][geo-api-get-current].

This method takes three arguments: a success callback, an error callback and an optional `options` object.

> Since we want a single value, we'll wrap this native method in a `Promise`.

Let's add a `getCurrentPosition(...)` method in our service:

```ts
export class GeolocationService {
  // ...
* getCurrentPosition(options: PositionOptions = {}): Promise<Position> {
*   return new Promise((resolve, reject) => {
*     if (!this.hasApi) {
*       reject('The Geolocation API is not available on this browser');
*     }
*     navigator.geolocation.getCurrentPosition(resolve, reject, options);
*   });
* }
}
```

### Explanations

```ts
getCurrentPosition(`/*2*/`options: PositionOptions = {}): `/*1*/`Promise<Position> {
  return new Promise((resolve, reject) => {
    if (!this.hasApi) { `/*3*/`
      reject('The Geolocation API is not available on this browser');
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options); `/*4*/`
  });
}
```
1. As announced, our method returns a `Promise` (the `Position` type is a **native TS interface** describing a user's location). Don't create it.
1. No need for success/error callbacks, since we're returning a `Promise`. Only the `options` object is necessary. We define an empty default value to render it **optional** (`PositionOptions` is also a native TS interface).
1. If the browser does not have the Geolocation API, the `Promise` is **rejected right away**.
1. Otherwise, we call the native method, resolve the `Promise` with the position when it is succcessfully retrieved, or reject it with the error if not.

### Usage

To use this method, inject the `GeolocationService` in a `Component` call its `getCurrentPosition(...)` method, and use the `then(...)` and/or `catch(...)` methods accordingly. For example, in `app.component.ts`:

```ts
// Imports
import { GeolocationService } from './shared/services/geolocation/geolocation.service';

@Component({ /* ... */ })
export class AppComponent {
  constructor(`private geolocation: GeolocationService`) {
    this.geolocation
*     .getCurrentPosition()
*     .then((position) => {
*       console.log('User located!', position);
*     })
*     .catch((error) => {
*       console.warn('Failed to locate user because', error);
*     });
  }
}
```

## Watching the position

Continuously watching for the user's location is done calling the Geolocation API's [`watchPosition(...)` method][geo-api-watch], whose signature is similar to the `getCurrentPosition(...)` method.

> Since we want several values over time, we'll wrap this native method with an `Observable`.

Let's add a `watchPosition(...)` method to our service:

```ts
export class GeolocationService {
  // ...
* watchPosition(options: PositionOptions = {}): Observable<Position> {
*   return new Observable((subscriber) => {
*     if (!this.hasApi) {
*       subscriber.error('The Geolocation API is not available on this browser');
*       subscriber.complete();
*     }
*     navigator.geolocation.watchPosition(
*       (position) => subscriber.next(position),
*       (error) => subscriber.error(error),
*       options
*     );
*   });
* }
}
```

### Explanations

```ts
watchPosition(`/*1*/`options: PositionOptions = {}): Observable<Position> {
  return new Observable((subscriber) => {
    if (!this.hasApi) { `/*2*/`
      subscriber.error(
        'The Geolocation API is not available on this browser'
      );
      subscriber.complete();
    }
    navigator.geolocation.watchPosition( `/*3*/`
      (position) => subscriber.next(position),
      (error) => subscriber.error(error),
      options
    );
  });
}
```
1. As previously, only the `options` object is necessary.
1. If the browser does not have the Geolocation API, we **emit an error** to subscribers with the `error` function, and **`complete` the `Observable`**, since it won't emit any value in the future.
1. Otherwise, we call the native method with a success callback that will make the `Observable` **emit a new value when a position is retrieved**, an error callback that will make the `Observable` **emit an error when a retrieval fails**, and the options.

### Usage

To use this method, inject the `GeolocationService` in a `Component`, call its `watchPosition(...)` method, and use the `subscribe(...)` method. For example, in `app.component.ts`:

```ts
// ...
import { GeolocationService } from './shared/services/geolocation/geolocation.service';

@Component({ /* ... */ })
export class AppComponent {
  constructor(`private geolocation: GeolocationService`) {
    this.geolocation.watchPosition().subscribe({
*     next: (position) => {
*       console.log('New user location!', position);
*     },
*     error: (error) => {
*       console.log('Failed to locate user because', error);
*     },
*   });
  }
}

```

## Resources

You'll find the complete service that you can copy/paste or download [here][final-service].


[caniuse-geoapi]: https://caniuse.com/#feat=mdn-api_geolocation
[geolocation-api]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
[navigator.geolocation]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API#Lobjet_geolocation
[geo-api-get-current]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation/getCurrentPosition
[geo-api-watch]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation/watchPosition
[rxjs]: https://mediacomem.github.io/comem-devmobil/latest/subjects/rxjs/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-prom]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-promises/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[final-service]: https://gist.github.com/Tazaf/a12764e80007613e68d6dcbf818c328a
