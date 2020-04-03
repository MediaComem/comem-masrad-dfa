# Angular UI Bootstrap

Learn how to use the Bootstrap JS plugins within an AngularJS app.

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)

**Recommended reading**

* [Bootstrap][bootstrap]
* [Javascript][js]
* [Angular][ng]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Bootstrap JS](#bootstrap-js)
  - [Include Bootstrap JS](#include-bootstrap-js)
- [What can it do?](#what-can-it-do)
- [Dropdown menus](#dropdown-menus)
- [Modals](#modals)
  - [The Modal Markup](#the-modal-markup)
  - [The Modal Trigger](#the-modal-trigger)
- [What's wrong with Angular?](#whats-wrong-with-angular)
- [Include Angular UI Bootstrap](#include-angular-ui-bootstrap)
- [Documentation](#documentation)
- [Dropdown Menus (Again)](#dropdown-menus-again)
- [Modals (Again)](#modals-again)
  - [The Modal Trigger](#the-modal-trigger-1)
  - [The Trigger Function](#the-trigger-function)
  - [The Modal Controller](#the-modal-controller)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Bootstrap JS

Bootstrap is **mainly** an HTML/CSS framework, as seen in the dedicated course.

But Bootstrap developpers decided to **enhance the Bootstrap features** with some JS code, more precisely code using jQuery.

This JS code allows more interesting and advanced behaviors.

> Bootstrap JS could be seen as a library.

### Include Bootstrap JS

In the same fashion as the Bootstrap CSS file, you can include the Bootstrap JS file in two ways:

> We won't do a live example with this Bootstrap JS file.

* Referencing a CDN url in your `index.html`:
```html
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
```

* Downloading Bootstrap, moving the `bootstrap.min.js` file in the `js` directory of your project directory, then referencing it in your `index.html`:
```html
<sccript src="js/bootstrap.min.js"></script>
```

> Be extra sure to add this `<script>` tag **AFTER** your jQuery inclusion, since Bootstrap JS relies solely on jQuery.

> You'll need to include the Bootstrap CSS file as well.

## What can it do?

Bootstrap JS adds dynamic behavior to some Bootstrap components, using jQuery instructions.

With it you can:
* Add modals
* Add dropdown menu
* Handle tab navigation
* Enhance alerts
* Enhance buttons
* And some other things

We'll see two examples in this slide-deck: **dropdown menus** and **modals**

> With Bootstrap JS, you generally **don't have** to actually write JS code.

> Many JS components can be activated by adding **special HTML attributes** to your elements.

## Dropdown menus

To create a dropdown menu in your application, you'll need to respect a specific HTML markup:

```html
<div `class="dropdown"`>
  <button class="btn btn-default" `data-toggle="dropdown"`>
    Dropdown trigger
    <span class="caret"></span>
  </button>
  <ul `class="dropdown-menu"`>
    <li>`<a href="#">`Element 1`</a>`</li>
    <li>`<a href="#">`Element 2`</a>`</li>
  </ul>
</div>
```
To behave as expected, you **must respect** this exact same structure with the exact same classes.

> Be sure to wrap an `<a>` tag around your `<li>` element's content, otherwise they won't be correctly stylized.

## Modals

Modals are small "windows" that appear **in front** of your main content and **block all interactivity** with it, until the modal is discarded.

They are useful for showing contextual information or specific interactivity that don't need a full page to be shown.

Modal component also needs a specific markup, and can be activated by any button on your page, without needing you to write any JS code.

### The Modal Markup

The smallest HTML markup for modal components is as follow:

```html
<div class="modal fade" `id="myModal"`>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" `data-dismiss="modal"`>
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title">Modal title</h4>
      </div>
      <div class="modal-body">
        Here goes the content.
      </div>
      <div class="modal-footer">
        <button class="btn btn-default" `data-dismiss="modal"`>Close</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```
> Modal templates are hidden from your page by default, until they are "activated".

> Elements with `data-dismiss="modal"` attribute can close the modal.

### The Modal Trigger

Showing modal can be done by any button or link anywhere in the page.

> It can also be done programmatically, but this won't be illustrated.

In this case, we added a link in a navbar that will show our modal:

```html
<a href="#"
  class="btn btn-success navbar-btn"
  `data-toggle="modal"`
  `data-target="#myModal"`>Log in</a>
```
> The `data-toggle` attribute needs to have the `modal` value.
> 
> The `data-target` attribute needs to have a selector that points to your modal's `id`
> 
> (e.g. if your modal component has an `id` whose value is `myModal` (as in the previous slide), the `data-target` will have a value of `#myModal`)

## What's wrong with Angular?

AngularJS **does not** include jQuery*, and it's **not advised** to include it manually.

> \* Well not exactly. It includes a lightweight version of jQuery, named jqLite.

Angular is written so that **classical jQuery operations** can be achieved using **Angular built-in features**.

Since jQuery is not present in Angular, you can't just include the Bootstrap JS file; it just **won't work**.

If you'd want to have the same features as offered by Bootstrap JS, you'd have to **write yourself** the code in *Angular style*.

Fortunately, some people already take care of that for you by wrinting **Angular UI Bootstrap**.

> This a library for Angular that provides you all Bootstrap JS components written in pure Angular JS.

## Include Angular UI Bootstrap

To add Angular UI Bootstrap in your project, you need to [download the file][auib] from to website, and place it, for example, on your `js` directory.

> Note that you can built a version that contains only the specific features you need.

Then, include the file with a `<script>` tag in your `index.html`

> Be sure to add this **AFTER** the inclusion of angular itself.

```html
<!-- angular script inclusion -->
<script src="js/ui-bootstrap-tpls-2.5.0.min.js"></script>
```

Finally, don't forget to **add the dependency** in your app's `module`:

```js
angular.module('myModule', ['`ui.bootstrap`']);
```

## Documentation

<!-- slide-front-matter class: center, middle -->

As always, the prime source of information about the library is it's official **documentation**.

In the case of Angular UI Bootstrap, you'll find it [here][uib-doc]

> Angular UI Bootstrap contains **all Bootstrap JS components**, along with some additionnal behaviors

## Dropdown Menus (Again)

Using Bootstrap Dropdown with Angular UI Bootstrap is very **simple**.

You'll need to respect the **same HTML Bootstrap Markup** as before, but will need to **remove** all the `data-*` attribute, and replace them with **directives**:

```html
<!-- remove class="dropdown" -->
<div `uib-dropdown`>
  <!-- remove data-toggle="dropdown" -->
  <button class="btn btn-default" `uib-dropdown-toggle`>
    Dropdown trigger
    <span class="caret"></span>
  </button>
  <!-- nothing to remove here. Just add the directive -->
  <ul class="dropdown-menu" `uib-dropdown-menu`>
    <li><a href="#">Element 1</a></li>
    <li><a href="#">Element 2</a></li>
  </ul>
</div>
```
## Modals (Again)

On the other hand, modals are a **little bit** more complicated to implement, because you'll need to **add some code**.

This time, you can export the modal markup in its own template file:

```html
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="close" `ng-click="myModalCtrl.close()"`>
      <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title">Modal title</h4>
  </div>
  <div class="modal-body">
    Here goes the content.
  </div>
  <div class="modal-footer">
    <button class="btn btn-default" `ng-click="myModalCtrl.close()"`>Close</button>
    <button class="btn btn-primary">Save changes</button>
  </div>
</div>
```
> The `div.modal.fade` and `div.modal-dialog` elements have been deleted.

> The `data-dismiss` attribute have been replaced by `ng-click` directives.

### The Modal Trigger

The button that previously triggered the showing of the modal needs to be **changed**.

It will no longer rely on `data-*` attribute, but will instead trigger **a call to a function in its controller**.

You can remove all `data-*` attributes from the button, and **replace** them with a `ng-click` directive, with the name of **the function to trigger**:

```html
<a href="#"
  class="btn btn-success navbar-btn"
  `ng-click="myCtrl.openModal()"`>Log in</a>
```
### The Trigger Function

Now, in the controller that's **responsible for this button**, add a new service dependency, called `$uibModal`.

Use this service's `.open()` method to create the function that will **show the modal** when triggered by the button.

```js
angular.module("myApp").controller("myController", function(`$uibModal`) {
  var myCtrl = this;

  myCtrl.openModal = function() {
      `$uibModal.open`({
        // Pass the path to the file containing your modal template
        templateUrl: "modal/template.html",
        // You can assign your modal its own controller
        controller: "myModalController",
        // The alias for the modal's controller
        controllerAs: "modal"
      });
  };
});
```

### The Modal Controller

As said in the previous slide, you can assign **its own controller** to your modal.

In this controller, if you want to **access the current modal instance**, you'll need to inject **a new service dependency**, called `$uibModalInstance`.

With this service, you could for example create a function that will **close the currently opened modal**, using the `.close()` method:

```js
angular.module("myApp")
  .controller("myModalController", function($`uibModalInstance`) {
    var myModalCtrl = this;
  
    // This function could be called by a button in the modal template
    myModalCtrl.close = `$uibModalInstance.close`;
  });
```

## Resources

<!-- slide-front-matter class: middle -->

**Documentation**

* [Angular UI Bootstrap Documentation][uib-doc]

[js]: ../js
[bootstrap]: ../bootstrap
[ng]: ../angular
[git]: ../git/
[chrome]: https://www.google.com/chrome/
[sublime]: https://www.sublimetext.com/
[auib]: https://angular-ui.github.io/bootstrap/
[uib-doc]: https://angular-ui.github.io/bootstrap/
