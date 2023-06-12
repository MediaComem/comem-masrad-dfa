# Geolocation

<!-- slide-front-matter class: center, middle -->

## Summary

Get started with the Geolocation API in your JavaScript application.

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
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The API

The [Geolocation API][geolocation-api] is an HTML5 API, natively accessible in [all modern browsers][caniuse-geoapi].

**It's NOT specific to Angular and can be used in any JS-based application running on a browser.**

> Don't hesitate to read the [API documentation][geolocation-api]

In this subject, we will create an **JavaScript module** that uses this native API and add some syntactic sugar around it.

The API is primarily composed of two methods, both using simple callbacks:

- One that allows you to get the user's position once
  > We'll use **Promises** here instead of basic callbacks
- One that allows you to watch the user's position over time
  > We'll use **Observables** here instead of basic callbacks

> **NOTE that using the Geolocation API is only possible if the end user allows you to do so! You must handle the case where it won't allow you to do so**

## The service

Let's create the module in our app at `src/utils/geolocation.ts` with this code:

```ts
export const Geolocation = {}
```

Now, when we load the module, we need to make sure that the browser the app is running on has the Geolocation API. We do this by [checking for the existence][navigator.geolocation] of the `geolocation` property in the `navigator` global object.

We'll create a flag in our module for that (for later use in the methods):

```ts
const hasApi = "geolocation" in navigator;

export const Geolocation = {};
```

## Getting the position

Ponctually getting the current user location is done calling the Geolocation API's [`getCurrentPosition(...)` method][geo-api-get-current].

This method takes three arguments: a success callback, an error callback and an optional `options` object.

> Since we want and will get a single value, we'll wrap this native method in a `Promise`.

Let's add a `getCurrentPosition(...)` static method in our `Geolocation` class:

```ts
const hasApi = "geolocation" in navigator;

export const Geolocation = {
* getCurrentPosition(options: PositionOptions = {}): Promise<GeolocationPosition> {
*   return new Promise((resolve, reject) => {
*     if (!hasApi) {
*       reject("The Geolocation API is not available on this browser");
*     }
*     navigator.geolocation.getCurrentPosition(resolve, reject, options);
*   });
* },
};
```

### Explanations

```ts
getCurrentPosition(`/*2*/`options: PositionOptions = {}): `/*1*/`Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!hasApi) { `/*3*/`
      reject('The Geolocation API is not available on this browser');
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options); `/*4*/`
  });
}
```

1. As announced, our method returns a `Promise` (the `GeolocationPosition` type is a **native TS interface** describing a user's location). Don't create it.
1. No need for success/error callbacks as params here, since we're returning a `Promise`. Only the `options` object is necessary. We define an empty default value to render it **optional** (`PositionOptions` is also a native TS interface).
1. If the browser does not have the Geolocation API, the `Promise` is **rejected right away**.
1. Otherwise, we call the native method, resolve the `Promise` with the position when it is succcessfully retrieved, or reject it with the error if not.

### Usage

To use this method, import the `Geolocation` constant anywhere in your app and call its `getCurrentPosition(...)` method. Then use the `then(...)` and/or `catch(...)` methods accordingly. For example, in `app.component.ts`:

```ts
// Other imports
*import { Geolocation } from './utils/geolocation';

@Component({/* ... */})
export class AppComponent `implements OnInit` {
  // ...

* ngOnInit(): void {
*   Geolocation.getCurrentPosition().then(console.log).catch(console.error);
* }
}
```

## Watching the position

Continuously watching for the user's location is done calling the Geolocation API's [`watchPosition(...)` method][geo-api-watch].

> Since we want several values over time, we'll wrap this native method with an `Observable`.

Let's add a `watchPosition(...)` method to our `Geolocation` constant:

```ts
import { Observable } from "rxjs";
// ...
export const Geolocation = {
  // getCurrentPosition(...) {...},
* watchPosition(options: PositionOptions = {}): Observable<GeolocationPosition> {
*   return new Observable((subscriber) => {
*     if (!hasApi) {
*       subscriber.error("The Geolocation API is not available on this browser");
*       subscriber.complete();
*     }
*     navigator.geolocation.watchPosition(
*       (position) => subscriber.next(position),
*       (error) => subscriber.error(error),
*       options
*     );
*   });
* },
};
```

### Explanations

```ts
watchPosition(`/*1*/`options: PositionOptions = {}): Observable<GeolocationPosition> {
  return new Observable((subscriber) => {
    if (!hasApi) { `/*2*/`
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

To use this method, import the `Geolocation` constant anywhere in your app, call its `watchPosition(...)` method, and use the `subscribe(...)` method. For example, in `app.component.ts`:

```ts
// Other imports
*import { Geolocation } from './utils/geolocation';

@Component({/* ... */})
export class AppComponent implements OnInit {
  // ...

  ngOnInit(): void {
*   Geolocation.watchPosition().subscribe({
*     next: console.log,
*     error: console.error,
*   });
* }
}

```

## Resources

You'll find the complete module that you can copy/paste or download [here][final-service].

[chrome]: https://www.google.com/chrome/
[vscode]: https://code.visualstudio.com/
[caniuse-geoapi]: https://caniuse.com/#feat=mdn-api_geolocation
[geolocation-api]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API
[navigator.geolocation]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation_API#Lobjet_geolocation
[geo-api-get-current]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation/getCurrentPosition
[geo-api-watch]: https://developer.mozilla.org/fr/docs/Web/API/Geolocation/watchPosition
[rxjs]: https://mediacomem.github.io/comem-devmobil/latest/subjects/rxjs/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[js-prom]: https://mediacomem.github.io/comem-devmobil/latest/subjects/js-promises/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[final-service]: https://gist.githubusercontent.com/Tazaf/a12764e80007613e68d6dcbf818c328a/raw/5aa63d082ff7794ff3a58a59ff6591c6c1a2984f/geolocation.ts
