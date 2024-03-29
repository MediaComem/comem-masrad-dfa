# Angular Routing

<!-- slide-front-matter class: center, middle -->

## Summary

Learn how to use Angular's [`Router`][ng-router] to set up navigation inside your application.

This subject is heavily inspired by the Angular's ["In-app navigation: routing to views"][router-guide] guide. We recommand that you check it out.

<!-- slide-include ../../BANNER.md -->

**You will need**

- [Google Chrome][chrome] (recommended, any browser with developer tools will do)
- [Angular CLI][ng-cli]
- [Visual Studio Code][vscode] (recommended, although any editor could do)

**Recommended reading**

- [Angular CLI][ng-cli]
- [Angular][ng]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
- [Why a router](#why-a-router)
- [Angular router](#angular-router)
- [Adding routing to an app](#adding-routing-to-an-app)
  - [Adding views](#adding-views)
  - [Creating routes](#creating-routes)
  - [Registering routes](#registering-routes)
  - [OK... but that still doesn't work!](#ok-but-that-still-doesnt-work)
- [Default route](#default-route)
- [Navigating in the app](#navigating-in-the-app)
- ["Catch all" route](#catch-all-route)
- [Path parameter](#path-parameter)
  - [Link to parametrized path](#link-to-parametrized-path)
  - [Navigation from the code](#navigation-from-the-code)
  - [Access path parameter](#access-path-parameter)
- [Active route link](#active-route-link)
- [Nested routes](#nested-routes)
  - [We're lost!](#were-lost)
  - [Fixing navigation](#fixing-navigation)
  - [Parentless](#parentless)
    - [Favorite child](#favorite-child)
- [Lazy loading](#lazy-loading)
  - [Code refactoring: The `PageModule`](#code-refactoring-the-pagemodule)
  - [Code refactoring: The `ProductModule`](#code-refactoring-the-productmodule)
  - [Code refactoring: The `AppRoutingModule`](#code-refactoring-the-approutingmodule)
  - [The `PageRoutingModule`](#the-pageroutingmodule)
  - [The `ProductRoutingModule`](#the-productroutingmodule)
  - [End result](#end-result)
  - [Loading strategy](#loading-strategy)
  - [Tips](#tips)
- [Guards](#guards)
  - [Random Access Guard](#random-access-guard)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

To follow along this subject, you'll need an Angular application.

You can create one by using the [Angular CLI][ng-cli]:

```bash
$> ng new
? What name ...
*? Would you like to add Angular routing? No
? Which stylesheet format ...
```

> Be sure to answer "**N**o" when asked if you want to **use routing**

> We will manually add routing on this subject for illustration purposes

## Why a router

Since an Angular application is technically a **Single-Page-Application (SPA)**, you'll need to **change** the UI depending on the actions of the user.

Those changes can be **minimal** (hiding/displaying an element, ordering a list, etc) or **quite substantial** (displaying a user's profile instead of a list of item).

For the minimal changes, using directives like `*ngIf` or updating the data and letting Angular reflecting those changes on the view could be enough.

But for substantial changes, you might want to organize your components **in page-like views** and switch back and forth between some of them.

## Angular router

Web applications developed with [Angular][angular] leverage Angular's [Router][router-guide] for navigation.

This router uses a **URL based system**, meaning that your app will display views depending on the current URL state.

Basically, navigation is defined in an Angular app by providing the router **a list of URLs** and **which `Component` should be displayed** for each of them.

## Adding routing to an app

Angular recommands creating a dedicated **module** to configure routing for each feature module requiring it.


Create a new `src/app/app-routing.module.ts` file with the following content:

```ts
import { NgModule } from '@angular/core';

@NgModule({ imports: [], exports: [] })
export class AppRoutingModule {}
```

Import this new module in `AppModule`:

```ts
// Other imports
*import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [/* ... */],
  imports: [BrowserModule, `AppRoutingModule`],
  bootstrap: [/* ... */],
})
export class AppModule {}
```
> Let the CLI set up this by using the `--routing` option when generating new module, e.g.: `ng generate module Example --routing`

### Adding views

We will need some views if we want our users to navigate between them.

Let's create two blank components that will contain those views:

```bash
$> ng generate component PageA
CREATE src/app/page-a/page-a.component.scss (0 bytes)
CREATE src/app/page-a/page-a.component.html (21 bytes)
CREATE src/app/page-a/page-a.component.spec.ts (622 bytes)
CREATE src/app/page-a/page-a.component.ts (275 bytes)
UPDATE src/app/app.module.ts (368 bytes)

$> ng generate component PageB
CREATE src/app/page-b/page-b.component.scss (0 bytes)
CREATE src/app/page-b/page-b.component.html (21 bytes)
CREATE src/app/page-b/page-b.component.spec.ts (622 bytes)
CREATE src/app/page-b/page-b.component.ts (275 bytes)
UPDATE src/app/app.module.ts (444 bytes)
```
### Creating routes

Let's say we want the app to display the content of the...
- `PageA` component when the user access `http://<app-domain>/page-a` URL
- `PageB` component when the user access `http://<app-domain>/page-b` URL

We'll define this in `app-routing.module.ts` by creating some `Routes`:

```ts
import { NgModule } from '@angular/core';
*import { Routes } from '@angular/router';
*import { PageAComponent } from './page-a/page-a.component';
*import { PageBComponent } from './page-b/page-b.component';

*const routes: Routes = [
* { path: 'page-a', component: PageAComponent },
* { path: 'page-b', component: PageBComponent },
*];

@NgModule({/* ... */})
export class AppRoutingModule {}
```
> The path of an URL is the part that comes right after the domain name.

> In an URL like `https://example.com/foo`, the path would be `foo`.

### Registering routes

Let's configure the router so that it's aware of the routes we just defined:

```ts
// Imports
import { Routes, `RouterModule` } from '@angular/router';

const routes: Routes = [
  { path: 'page-a', component: PageAComponent },
  { path: 'page-b', component: PageBComponent },
];

@NgModule({
  imports: [`RouterModule.forRoot(routes)`],
  exports: [`RouterModule`],
})
export class AppRoutingModule {}
```
> The `AppModule`, that imports this `AppRoutingModule`, is the _root_ module of our app, the one loaded first when the app starts. As such, we use the `forRoot(...)` method to tell the `RouterModule` that the provided configuration applies to the _root_ module.

> We need to `export` the `RouterModule` so that its directives are visible to the `AppModule` (and thus our entire app).

### OK... but that still doesn't work!

You're right. We told our router which `Component` it should display depending on the browser's URL...

But we didn't told it **where** those `Component`s should be displayed.

We need to add a dedicated tag in our `app.component.html` that will be replaced by the `Component` when needed:

```html
<h1>Angular Application</h1>
*<router-outlet></router-outlet>
```
You can now navigate to [`http://127.0.0.1:4200/page-a`](http://127.0.0.1:4200/page-a) to see the view associated with `PageAComponent`, and to [`http://127.0.0.1:4200/page-b`](http://127.0.0.1:4200/page-b) to see the view of `PageBComponent`.

> All the previous configuration steps (except the creation of the routes themselves) are done **automatically** by the Angular CLI when you create a new application with the `--routing` option, or by answering "**Y**es" when asked wether to use routing.

> **Use this next time you create new application instead of doing this by hand.**

## Default route

If you navigate to the root of your application, you'll see that neither the view of `PageA` nor `PageB` is present. This is **expected** since the actual URL **does not match** any of their paths.

If you want the router to **redirect your user** to a default route, you can do so by using the `redirectTo` property of a `Route` object.

Let's illustrate this by adding the following to the `app-routing.module.ts`:

```ts
// Imports

const routes: Routes = [
* { path: '', redirectTo: 'page-a', pathMatch: 'full' },
  { path: 'page-a', component: PageAComponent },
  { path: 'page-b', component: PageBComponent },
];

@NgModule({/* ... */})
export class AppRoutingModule {}
```
> `pathMatch` is required with `redirectTo`. The `full` value means that this route will be activated only if the URL path matches **exactly** the one defined in the `path` property.

## Navigating in the app

Asking our user to manually update the URL is not an viable option... We need to add **in-app navigation**.

Let's create a navigation menu in our `app.component.html` layout:

```html
<h1>Angular Application</h1>
<ul>
  <li><a `routerLink="/page-a"`>Page A</a></li>
  <li><a `routerLink="/page-b"`>Page B</a></li>
</ul>
<router-outlet></router-outlet>
```
The [`routerLink`][angular-router-link] directive allows the element to which it is attached to **make the app navigate to the given path** when clicked by the user.

We could also add a button in `page-a.component.html` that navigates to `page-b`:

```html
<p>page-a works!</p>
*<button routerLink="/page-b">Go To Page B</button>
```
> Note the `/` at the start of the `routerLink` value. This indicates that the path is an **absolute** path.

## "Catch all" route

It's possible to declare a route that would match **anything that hasn't matched** any other routes.

> This could be useful to set up a fallback page, like a **404 page**.

Do this by setting the `path` to the special `**` value (which means "everything"), for example here in `app-routing.module.ts`:

```ts
const routes: Routes = [
  { path: '', redirectTo: 'page-a', pathMatch: 'full' },
  { path: 'page-a', component: PageAComponent },
  { path: 'page-b', component: PageBComponent },
* { path: '**', component: ErrorComponent },
];
```
This way, paths that don't match `''`, `'page-a'` or `'page-b'` wil display the `ErrorComponent`.

> Note that the **order** in which the routes are declared is **important**: the router always picks the **first** route that matches the current path.

> Try moving the highlighted route to the **first position** of the `Routes` array and see what happens!

## Path parameter

Sometimes, you wont know the exact value of your routes beforehand. This could be the case if you want to display e.g. a product details page with URL like those:

* `https://example.com/products/12`
* `https://example.com/products/817`
* `https://example.com/products/9`

All of them would display the same view, but the actual content would depend on the product whose `id` is in the path.

You can declare this kind of dynamic routes like so:

> Generate the component with `ng generate component ProductDetails`

```ts
{ path: 'products/:id', component: ProductDetailsComponent }
```
The `:id` token in the `path` declares a parameter named `id` whose value will be the value in the actual path (`12`, `817` or `9` in the above examples).

### Link to parametrized path

If you want to link to such a route from your templates, you can still use the [`routerLink`][angular-router-link] directive, but will need to bind it to an **array of path parts**.

<hr>

Add a `product` property to `AppComponent`:

```ts
import { Component } from '@angular/core';

@Component({/* ... */})
export class AppComponent {
  // In a real-life scenario, product would be fetched from the backend
* product = { id: 9 };

  constructor() {}
}
```
And a new navigation item in the menu in `app.component.html`:

```html
<ul>
  <!-- previous items -->
  <li><a `[routerLink]="['/products', product.id]"`>Product details</a></li>
</ul>
```
> Again, the `/` indicates that the path is **absolute**

### Navigation from the code

It's also possible to trigger navigation from your `Component`'s code by injecting the [`Router`][angular-router-class] service in the constructor:

```ts
export class AppComponent {
  // In a real-life scenario, product would be fetched from the backend
  product = { id: 9 };

  constructor(`private router: Router`) {}

* goToSimpleRoute() {
*   this.router.navigateByUrl('/page-a');
* }

* goToParametrizedRoute() {
*   this.router.navigate([ '/products', this.product.id ]);
* }
}
```
And update the `app.component.html` accordingly:

```html
<ul>
  <li><a `(click)="goToSimpleRoute()"`>Page A</a></li>
  <li><a routerLink="/page-b">Page B</a></li>
  <li><a `(click)="goToParametrizedRoute()"`>Product details</a></li>
</ul>
```

### Access path parameter

To access the `id` path parameter from your code, you'll need to inject the [`ActivatedRoute`][angular-activated-route] service in your `Component`'s constructor, and subscribe to its `paramMap` **observable** _(this is a synchronous operation)_:

```ts
// imports omitted for brevity
@Component({ /* ... */ })
export class ProductDetailsComponent  {

  productId: any;

  constructor(
*   private route: ActivatedRoute
  ) {
*   this.route.paramMap.subscribe((params: ParamMap) => {
*     this.productId = params.get('id');
*   });
  }
}
```

Display it in the `product-details.component.html`:

```html
<p>product-details works!</p>
*<p>Product ID: {{ productId }}</p>
```
## Active route link

You can use the [`RouterLinkActive`][router-link-active] directive to add **CSS classes** to an element with a `routerLink` directive **when its path is the current one**.

Add this to the `app.component.html` template:

```html
<ul>
  <li><a `routerLinkActive="selected-nav-item"`
      routerLink="/page-a">Page A</a></li>
  <li><a `routerLinkActive="selected-nav-item"`
      routerLink="/page-b">Page B</a></li>
  <li><a `routerLinkActive="selected-nav-item"`
      [routerLink]="['/products', product.id]">Product details</a></li>
</ul>
```
> This will add the `.selected-nav-item` to the element whose `routerLink` path is the currently active one

Add the following in `app.component.scss`:

```scss
a`.selected-nav-item` {
  text-decoration: none;
  cursor: default;
  color: grey;
}
```
## Nested routes

Now, suppose that the product details page should have its own internal navigation, to allow users to change from a `General` details tab to a `Technical` details tab.

We could define this by creating two new routes in `app-routing.module.ts`:

> Spoiler alert: don't do this

```ts
const routes: Routes = [
  // Previous routes
  { path: 'products/:id', component: ProductDetailsComponent },
* { path: 'products/:id/general', component: ProductDetailsGeneralComponent },
* { path: 'products/:id/technical', component: ProductDetailsTechnicalComponent },
  { path: '**', component: ErrorComponent },
];
```
Then adding tab navigation in `product-details.component.html`:

```html
<p>product-details works!</p>
<p>Product ID: {{ productId }}</p>
*<button [routerLink]="['/products', productId, 'general']">General</button>
*<button [routerLink]="['/products', productId, 'technical']">Technical</button>
```
### We're lost!

That will work, with only one slight issue:

When clicking either button on the product details page, it is **entirely replaced** by either the "General" view or the "Technical" view.

> It's the expected behavior, but not the one we want to achieve.

Instead, we'd like to keep the product details page content, and only change **a part** of it, specifically the tab content.

We can achieve that by:

- Adding another `<router-outlet>` in `product-details.component.html`
  ```html
  <p>product-details works!</p>
  <p>Product ID: {{ productId }}</p>
  <button [...]>General</button>
  <button [...]>Technical</button>
  *<router-outlet></router-outlet>
  ```
- Creating **child routes** for the `products/:id` route

### Fixing navigation

Use the `children` property in any route definition to add it **child routes**, by providing a `Routes` array.

Each of this **child routes** is **relative** to its parent, and will be displayed in the `<router-outlet>` tag of its view.

Let's add those **child routes** in `app-routing.component.ts`:

```ts
const routes: Routes = [
  // Previous routes
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
*   children: [
*     { path: 'general', component: ProductDetailsGeneralComponent },
*     { path: 'technical', component: ProductDetailsTechnicalComponent },
*   ],
  },
  { path: '**', component: ErrorComponent },
];
```
> Note how the `path` of the **child routes** is defined **relatively** to the parent's.

### Parentless

The **child routes** concept can be used without a concrete parent component. This can help you organize your paths for better URLs or whatnot.

We want to change the paths that display each `PageXComponent` in our app so that instead of `/page-x`, they would look like `/page/x`.

Let's do that in `app-routing.component.ts`:

```ts
const routes: Routes = [
  { path: '', redirectTo: 'page-a', pathMatch: 'full' },
* {
*   path: 'page',
*   // Note the absence of the component property, here
*   children: [
*     { path: 'a', component: PageAComponent },
*     { path: 'b', component: PageBComponent },
*   ],
* },
  // Other routes
];
```
> Update the `routerLink` directives values in `app.component.html` and `product-a.component.html` accordingly

#### Favorite child

Of course, now the **default route** does not longer works, since the path `page-a` doesn't exist anymore. We have two options to fix this and get back the previous behavior:

1. Give the full path in the main **default route**:
  ```ts
    const routes: Routes = [
      { path: '', redirectTo: `'page/a'`, pathMatch: 'full' },
      // Other routes
    ];
  ```
2. Redirect to the `page` route, and add it its own **default route**:
  ```ts
    const routes: Routes = [
      { path: '', redirectTo: `'page'`, pathMatch: 'full' },
      { path: 'page', children: [
    *   { path: '', redirectTo: 'a', pathMatch: 'full' },
        { path: 'a', component: PageAComponent },
        { path: 'b', component: PageBComponent },
      ]},
      // Other routes
    ];
  ```
  > This way, when accessing the root of our app (`/`), we are first redirected to `/page` which, in turn, redirects us to `/page/a`

## Lazy loading

Right now, Angular will bundle our app in **one single file**, and serves it to our users.

Angular allows us to optimize this by loading **part of our app** only when the user **access it the first time**.

This process is called **Lazy Loading**, and can be achieved by **splitting our app in several feature modules**, then using some of the `Router` configuration to make it **load them when certain paths are accessed**.

<hr>

In our little example, we have two distincts parts in our app: the "Pages" and the "Product details".

Let's create a `PageModule` for page-related feature and a `ProductModule` for product-related features:

```bash
$> ng generate module Page --routing
$> ng generate module Product --routing
```
> Since lazy loading is done through the `Router`, lazy loaded modules must have routing enabled

### Code refactoring: The `PageModule`

The `PageModule` should be responsible of all page-related features.

Right now this only means the `PageAComponent` and the `PageBComponent`.

So let's remove the declarations of those components from the `AppModule` (and their imports), then add them to the `PageModule` instead:

> For a better file structure, the `page-a` and `page-b` directories have also been moved under the `page` directory.

```ts
// Other imports
*import { PageAComponent } from './page-a/page-a.component';
*import { PageBComponent } from './page-b/page-b.component';

@NgModule({
  declarations: [`PageAComponent`, `PageBComponent`],
  imports: [/* ... */],
})
export class PageModule {}
```
> This will cause some compilation errors. Don't worry, we'll fix them in no time.

### Code refactoring: The `ProductModule`

Similarily, the `ProductModule` should be responsible for the `ProductDetailsComponent`, along with the `ProductDetailsGeneralComponent` and `ProductDetailsTechnicalComponent`.

Remove their declarations (and their imports) from the `AppModule` and add them to the `ProductModule`.

> For a better file structure, the `product-details`, `product-details-general` and `product-details-technical` directories have also been moved under the `product` directory.

```ts
// Other imports
*import { ProductDetailsComponent } from './product-details/product-details.component';
*import { ProductDetailsGeneralComponent } from './product-details-general/product-details-general.component';
*import { ProductDetailsTechnicalComponent } from './product-details-technical/product-details-technical.component';

@NgModule({
  declarations: [
*   ProductDetailsComponent,
*   ProductDetailsGeneralComponent,
*   ProductDetailsTechnicalComponent,
  ],
  imports: [/* ... */],
})
export class ProductModule {}
```

### Code refactoring: The `AppRoutingModule`

Now, let's update the routes in `app-routing.module.ts` so that:
- `PageModule` is loaded for any path starting with `page`
- `ProductModule` is loaded for any path starting with `products`

```ts
// Don't forget to remove unused imports!

const routes: Routes = [
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  {
*   path: 'page',
*   loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
  },
  {
*   path: 'products', // <-- Not 'products/:id'!
*   loadChildren: () => import('./product/product.module').then((m) => m.ProductModule),
  },
  { path: '**', component: ErrorComponent },
];
```
> `loadChildren` is a property that takes a function which loads a module at a given path (using [ES6 dynamic import][es6-import]), then returns its class.

### The `PageRoutingModule`

Since we removed the `page`'s **child routes** from `app-routing.module.ts`, we need to redefine them in the `page-routing.module.ts`:

```ts
// Other imports
*import { PageAComponent } from './page-a/page-a.component';
*import { PageBComponent } from './page-b/page-b.component';

const routes: Routes = [
* { path: '', redirectTo: 'a', pathMatch: 'full' },
* { path: 'a', component: PageAComponent },
* { path: 'b', component: PageBComponent },
];

@NgModule({
  imports: [RouterModule.`forChild`(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
```
Two things worth noticing here:
1. The routes are no longer under a `children` property: when a module is lazy loaded, any route it defines is considered a child of the route that initialized the module's loading (here, it's the `page` route)
1. The `RouterModule` is configured with `forChild(...)` because the loaded module is not the _root_ module.

### The `ProductRoutingModule`

Here's the route configuration for `product-routing.module.ts`:

```ts
const routes: Routes = [
  {
    path: ':id',
    component: ProductDetailsComponent,
    children: [
      {
        path: 'general',
        component: ProductDetailsGeneralComponent,
      },
      {
        path: 'technical',
        component: ProductDetailsTechnicalComponent,
      },
    ],
  },
];
```
The route that was `product/:id` has been split in a route `product`, that loads the `ProductModule`, that have only one route: `:id`

> Here, `general` and `technical` are still **children** of the `:id` route, since they are **not full pages** themselves: they are still only **part** of what composes a product details page.

### End result

With this configuration, we now have three modules in our app:
- `AppModule` that start our app and configure its main routes
- `PageModule` that is loaded by an access to `page` paths and adds routes related to pages
- `ProductModule` that is loaded by an access to `product` paths and adds routes related to product detail page

When building the app, Angular will now create **three separate files**.

You can check how those files are loaded by opening the **Network** tab of the Chrome Developer Tools, and accessing the root of your app.

You should see the `main` file loaded, then the `page-module` file.

If you click on the link to see the product details, the `product-module` file will be loaded.

### Loading strategy

With the current `Router` configuration, your app is loaded with the **bare minimum** modules required to bootstrap it ; this helps in reducing the initial loading time.

Then, additional feature modules are loaded when **there respective route is being activated** by the user, at the expense of a **limited loading time**.

There's an additionnal `Router` configuration, `preloadingStrategy`, that you can use to make your app **loads all lazy loaded modules in the background**, after the initial app loading.

Let's try it in `app-routing.module.ts`:

```ts
import { Routes, RouterModule, `PreloadAllModules` } from '@angular/router';

// ...
    RouterModule.forRoot(routes, `{ preloadingStrategy: PreloadAllModules }`),
// ...
```
> Using this option is up to you and your app's use case

### Tips

When working with lazy loaded modules...
- **Try to make your files structure match your routes structure**: if you have nested routes, create corresponding nested directories.

- **Use [Angular CLI][ng-cli] to generate elements**, as it automates a lot of configuration chores.

- **Be sure to generate your elements at the right place**.
  - Don't forget that you can either provide a path before the element name, or move to the right directory before generating.
  - Use the `--dry-run` option with `ng generate` to double-check the new files location, and which module would be updated.

## Guards

`Guards` are special functions that you can use to prevent unwanted routes activations, _for example_ prevent an anonymous user to access restricted part of your app.

The **Angular CLI** can help you generate them with `ng generate guard <Name>`.

It will ask you which type of function you want to implement. Those type of functions will define the context in which your guard will be run:

- [`CanActivate`][can-activate] - A `CanActivateFn` can be used to **prevent access** to the route it's being applied to
- [`CanActivateChild`][can-activate-child] - A `CanActivateChildFn` function can be used to **prevent access to any `children`** of the route it's being applied to
- [`CanMatch`][can-match] - A `CanMatchFn` function can be used to **prevent the matching** of the route it's being applied to
- [`CanDeactivate`][can-deactivate] - A `CanDeactivateFn` function can be used to **prevent leaving** a specific route

> A function (and thus guard) can only implements one interface. If you need a single function to be used in several type of guard, you'll need to create one guard for each required type.

### Random Access Guard

Let's create a `Guard` that randomly prevent access to a route with `ng generate guard Random --skip-tests`, and select the `CanActivate` type.

In the generated `src/app/random.guard.ts` file, add the following code in the function's body:

```ts
import { CanActivateFn } from '@angular/router';

export const randomGuard: CanActivateFn = () => {
  const authorized = Math.random() >= 0.5;
  console.log(!authorized ? 'NOPE!' : 'GRANTED...');
  return authorized;
};
```
Apply this to a `Route` by adding it to the `canActivate` property array:

```ts
// page-routing.module.ts
{ path: 'a', component: PageAComponent, `canActivate: [randomGuard]` }
```
> There are also `canActivateChild`, `canMatch` and `canDeactivate` properties

> All guards in an array **must pass** for the route to be activated

## Resources

- [Common routing tasks][router-guide]
- [Lazy-loading feature modules][lazy-loading-guide]

[can-activate]: https://angular.io/api/router/CanActivateFn
[can-deactivate]: https://angular.io/api/router/CanDeactivateFn
[can-activate-child]: https://angular.io/api/router/CanActivateChildFn
[can-match]: https://angular.io/api/router/CanMatchFn
[es6-import]: https://caniuse.com/#feat=es6-module-dynamic-import
[router-link-active]: https://angular.io/api/router/RouterLinkActive
[angular-router-class]: https://angular.io/api/router/Router
[angular-activated-route]: https://angular.io/api/router/ActivatedRoute
[angular-router-link]: https://angular.io/api/router/RouterLink
[angular]: https://angular.io
[router-guide]: https://angular.io/guide/router
[vscode]: https://code.visualstudio.com/
[chrome]: https://www.google.com/chrome/
[ng]: ../angular
[ng-cli]: ../angular-cli
[ng-router]: https://angular.io/api/router/Router
[lazy-loading-guide]: https://angular.io/guide/lazy-loading-ngmodules
