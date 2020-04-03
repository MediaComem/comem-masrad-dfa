# Angular Geolocation

Learn to use the Geolocation API in an Angular app.

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)

**Recommended reading**

* [Angular][ng]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Introduction](#introduction)
- [Use the API](#use-the-api)
  - [`.getCurrentPosition()`](#getcurrentposition)
  - [`.watchPosition()`](#watchposition)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Web Browser provides an [Geolocation API][geoapi-doc] that allow developers to access the geolocation of their users.

But, as usual, it's not advised to use this API directly inside an Angular App ; you need a service that wraps this API to be complient with Angular.

We'll use [ngGeolocation][ngloc].

To include it in your project, download the `.js` file [here][ngloc-file] and save it somewhere in your project.

Include the file in your `index.html`, and the module in your app's dependencies:

```html
<script type="text/javascript" src="assets/js/ngGeolocation.min.js"></script>
```

```js
angular.module('app', [..., `'ngGeolocation'`]);
```

## Use the API

<!-- slide-front-matter class: middle -->

You'll need to add the `$geolocation` service as a depency to the controller in which you want to access the API.

```js
angular.module("app").controller("myController", function (`$geolocation`) {
  // ...
}
```
### `.getCurrentPosition()`

Then, you can use the `.getCurrentPosition()` method to access the current user's position:

> The user will be asked if he/she accepts to reveal it's location

```js
angular.module("app").controller("myController", function ($geolocation) {
  // Previous code

  $geolocation.getCurrentPosition()
    .then(function (position) {
      // This will be executed when the location is accessed
      console.log(position)
    }, function (error) {
      // This will be executed if the user denies access
      // or the browser doesn't support the Geolocation API
      console.log(error);
    })
}
```
> Getting the location is an **asynchronous** operation.

Use `position.coords.latitude` and `position.coords.longitude` to actually get the position's coordinates

### `.watchPosition()`

You could want to access the user location on a regular bassis. To do this, you mustn't call the `.getCurrentLocation()` each time.

You'll use the `.watchPosition()` method.

```js
angular.module("app").controller("myController", function ($geolocation) {
  // Previous code
  `$geolocation.watchPosition()`;
}
```
This method will get the user's location regularly and store the result in the `$geolocation.position` property.

> Getting the location is still an **asynchronous** operation.
> 
> Meaning, that if you'd try to access `$geolocation.position` right after calling the method, you'll get an `undefined`.

Delete the watch using the `$geolocation.clearWatch()` method.

#### `$geolocation.position`

If the position can be accessed, `$geolocation.position` will have a Position object.

With it, your can access `$geolocation.position.coords.latitude` and `$geolocation.position.coords.longitude` for the coordinates.

When `.watchPosition()` detects a new position, it fires an event, called `$geolocation.position.changed` to which you can listen.

----

If something went wrong and the position could not be accessed, `$geolocation.position` will contain and Error object.

To know the reason of the error, access the `$geolocation.position.error.message`.

When `.watchPosition()` detects and error, it fires an event, called `$geolocation.position.error` to which you can listen.

## Resources

**Documentation**

* [ngGeolocation - Documentation][ngloc-doc]

[ng]: ../angular
[chrome]: https://www.google.com/chrome/
[sublime]: https://www.sublimetext.com/
[geoapi-doc]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
[ngloc]: https://github.com/ninjatronic/ngGeolocation
[ngloc-file]: https://github.com/ninjatronic/ngGeolocation/blob/master/ngGeolocation.min.js
[ngloc-doc]: https://github.com/ninjatronic/ngGeolocation/wiki/API-Reference