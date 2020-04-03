# Angular Leaflet

Learn the basics of using the angular-leaflet directive in your project, to display and manipulate maps.

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)

**Recommended reading**

* [Angular][ng]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Introduction](#introduction)
- [Download the requisites](#download-the-requisites)
- [Include the directive](#include-the-directive)
- [Documentation](#documentation)
- [Include the map](#include-the-map)
- [Change default behavior](#change-default-behavior)
- [Center the map](#center-the-map)
- [Add markers](#add-markers)
  - [Fix the default marker](#fix-the-default-marker)
  - [Personalize the markers icon](#personalize-the-markers-icon)
  - [Draggable Markers](#draggable-markers)
- [Events](#events)
- [Complete example](#complete-example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

[Leaflet][leaflet] is a JavaScript library that provides an API for creating, displaying and manipulating maps in applications.

It's not usable as-is in an angular project, because it does not follow the "*Angular Way*".

Thus, you'll need to use a community created angular directive that embeds Leaflet: the [angular-leaflet-directive][ngld].

## Download the requisites

Even if you won't use it directly, you'll need to download the Leaflet library, since angular-leaflet relies on it.

To do this, use [any methods proposed by Leaflet][leaflet-dl].

> We recommand that you download the latest Leaflet version.

You'll get a `leaflet.zip` file, that you'll need to unzip in your project.

Do this in a `leaflet` directory, directly under your `assets` directory.

Once it's done, you'll then need to include both the `leaflet.js` and `leaflet.css` files in your `index.html` file:

```html
<link rel="stylesheet" href="assets/leaflet/leaflet.css">
```
```html
<script type="text/javascript" src="assets/leaflet/leaflet.js"></script>
```
## Include the directive

You'll then need to download and include the files for the `angular-leaflet` directive.

To get the `.js` file, go to the GitHub repository, or download it from [there][ngld-dl].

Either way, you should place it in your `assets/js` directoty.

Then, don't forget to add the file in your `index.html` file

Be sure to add it **after the inclusion of both `angular` and `leaflet`!**

```html
<script type="text/javascript" src="assets/js/angular-leaflet-directive.min.js"></script>
```

Finally, add the dependence in your app's dependencies.

```js
angular.module('app', [
  // Previous dependencies
  'leaflet-directive'`
]);
```

## Documentation

<!-- slide-front-matter class: center, middle -->

**BEWARE!**

The documentation for `angular-leaflet-directive` is... [lacking][ngld-doc], to say the least.

This is a library that you'll need to learn by trying things and deciphering examples ([which are aplenty][ngld-ex]).

We will sometimes redirect you to the [Leaflet Documentation][leaflet-doc], but know that you won't be able to use it as-is with `angular-leaflet-directive`...

> **You've been warned.**

## Include the map

The `leaflet-directive` is, as its name implies, an angular directive that uses Leaflet to show the map on your page.

This directive is named `<leaflet>`, and accepts a bunch of attributes that will modify or extend its behavior (*you'll need a controller for that*).

The easiest way of showing a map is to just add the directive, adding it some `width` and `height`, either with CSS or HTML attributes:

```html
<!-- Somewhere in your template -->
<leaflet width="100%" height="480px"></leaflet>
```
> The displayed map will have basics behavior:
* Open Street Map baselayer
* Zoom, with:
  * +/- buttons controls
  * double-click
  * mouse scroll
* Paning (drag'n'drop)

## Change default behavior

> In the following examples, the controller for the directive has a `map` alias.

To change some default behavior of the map, create an object on your controller with the desired changes (**all are optionals**):

```js
map.defaults = {
  doubleClickZoom: false, // disable the double-click zoom
  scrollWheelZoom: false, // disable zooming with the scroll
  dragging: false, // disable moving the map with dragging it with the mouse
  minZoom: 10, // Limit the minimal zoom
  maxZoom: 16, // Limit the maximal zoom
  ...
}
```
> You can try some of the options [here][map-options]

Then bind this object to the `defaults` attribute of the directive:

```html
<leaflet [...] `defaults="map.defaults"`></leaflet>
```

## Center the map

You can change the default center and zoom of the displayed map.

In the controller, you'll need to declare an object like this one:

```js
map.center = {
  // These are the coordinates for the center of Yverdon-les-Bains
  lat: 46.778474,
  lng: 6.641183,
  zoom: 15 // This one is actually optional
}
```
> By default, `angular-leaflet` uses **latitude and longitude coordinates**.

Then, bind this `map.center` object to the `lf-center` attribute of the directive:

```html
<leaflet [...] `lf-center="map.center"`></leaflet>
```

## Add markers

To add some markers on your map, declare an array of marker objects.

Each marker object needs, at minimum, `lat` and `lng` properties:

```js
map.markers = [
  {
    lat: 46.781547,
    lng: 6.640351
  }, {
    lat: 46.781058,
    lng: 6.647179
  }, {
    lat: 46.778246,
    lng: 6.641490
  }
]
```
Then, bind this array to the `markers` attribute of the directive:

```html
<leaflet [...] `markers="map.markers"`></leaflet>
```
> You can add new marker objects in this `map.markers` array at anytime; they will be dynamically added to the map.

### Fix the default marker

When writing this subject, we stumble upon a bug where **the default icons where not showing**.

**If this happens to you**, copy/paste this code **before the definition** of your `map.markers`...
```js
var defaultIcon = {
  iconUrl: "assets/leaflet/images/marker-icon.png",
  shadowUrl: "assets/leaflet/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}
```
...then, add this property to all your markers:
```js
{
  ...
  icon: defaultIcon
}
```
> We will see in more details what this do

### Personalize the markers icon

You can use your own marker icons in your map. For that, you can define an Icon object in your controller, listing the properties of your custom icon:

```js
var myIcon = {
  iconUrl: "images/myIcon.png", // The only one that's required
  iconSize: [38, 95], // [X, Y], in pixels
  iconAnchor: [22, 95], // The point that will match the coordinates
  shadowUrl: "images/myIconShadow.png", // if your icon has a shadow
  shadowSize: [50, 64], // see iconSize
  shadowAnchor: [5, 64] // see iconAnchor
};
```
> The list of all the properties for this object can be found [here][doc-icon]

Then, reference this object in your marker object, using the `icon` property:

```js
map.markers = [
  // Previous markers
  {
    lat: 46.779244,
    lng: 6.659402,
    `icon: myIcon`
  }
]
```

### Draggable Markers

To make your marker movable on the map, add the `draggable` property:

```js
map.markers = [
  // Previous markers
  {
    lat: 46.779244,
    lng: 6.659402,
    icon: myIcon,
    `draggable: true`
  }
]
```
> Moving the marker will update its `lat` and `lng` properties' value

To react to the marker being moved, you can attach a listener to your controller's `$scope`:

```js
$scope.$on('leafletDirectiveMarker.dragend', function(event, args) {
  console.log(args.model); // Will give you the updated marker object
});
```
> Remember to add `$scope` to your controller's dependencies

## Events

Leaflet provides a quite extensive list of events to react to.

> By default, all fired events are logged in the console. That's convenient to find the name of the event to which we want to react.

To react to one event, add a listener to your controller's `$scope` with the `.$on()` method:

```js
$scope.$on('eventName', function(event, args) {
  // Do something
});
```

Here a list of the more perrtinent events:

* `leafletDirectiveMarker.dragend`: the user stops dragging a marker. Use `args.model` to access the updated marker.
* `leafletDirectiveMarker.click`: the user clicked on a marker. Use `args.model` to access the clicked marker.
* `leafletDirectiveMap.click`: the user clicked somewhere on the map. Use the `args.leafletEvent.latlng` object to access the coordinates of the clicked point.

## Complete example

<!-- slide-front-matter class: center, middle -->

You will found the complete example with all the features presented in this subject in [this GitHub repository][complete-example].

[ng]: ../angular
[chrome]: https://www.google.com/chrome/
[sublime]: https://www.sublimetext.com/
[leaflet]: http://leafletjs.com/
[ngld]: http://tombatossals.github.io/angular-leaflet-directive/#!/
[leaflet-dl]: http://leafletjs.com/download.html
[ngld-dl]: https://github.com/MediaComem/webdev-masrad_angular-leaflet-demo/blob/master/assets/js/angular-leaflet-directive.min.js
[ngld-doc]: https://github.com/tombatossals/angular-leaflet-directive/tree/master/doc
[ngld-ex]: http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/basic/first-example
[leaflet-doc]: http://leafletjs.com/reference-1.0.3.html
[map-options]: https://github.com/tombatossals/angular-leaflet-directive/blob/master/doc/defaults-attribute.md
[doc-icon]: http://leafletjs.com/reference.html#icon-options
[complete-example]: https://github.com/MediaComem/webdev-masrad_angular-leaflet-demo