# Angular Auth Starter

Kickstart your Citizen Engagement project by implementing a complete authentification workflow.

<!-- slide-include ../../BANNER.md -->

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)

**Recommended reading**

* [Angular][ng]
* [Angular UI Router][ng-router]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [First step](#first-step)
- [What is contained in the base project](#what-is-contained-in-the-base-project)
- [The log in page](#the-log-in-page)
  - [Add the controller](#add-the-controller)
  - [Show it on the app](#show-it-on-the-app)
  - [Get the values](#get-the-values)
  - [Button click](#button-click)
- [Manage the authentication](#manage-the-authentication)
  - [Complete the service](#complete-the-service)
- [Get the authentication token](#get-the-authentication-token)
  - [Add error handling](#add-error-handling)
- [Restrict access](#restrict-access)
- [Persist the token](#persist-the-token)
  - [Update our app](#update-our-app)
- [Add a new page](#add-a-new-page)
- [Log out](#log-out)
  - [Add the function](#add-the-function)
- [Add the header](#add-the-header)
- [Interceptor 2000©](#interceptor-2000%C2%A9)
  - [Register the Interceptor](#register-the-interceptor)
- [Conclusion](#conclusion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## First step

To start your project, you can clone the repository that contains a basic project structure.

To do this, go to the directory that contains all your project, and use this command:

```bash
$> git clone git@github.com:MediaComem/comem-webdev-angular-auth-starter.git
```

> You can also access directly the [GitHub page of the project][git-proj], and download a `.zip` file of the project.

> If you do this, be sure to download a zip for the `master` branch.

## What is contained in the base project

This project already contains some basic structure. That is:
* The `angular` framework
* The `angular-ui-router` library
* The `lodash`library *(not required, but could prove usefull for your project)*
* The `moment` library *(not required, but could prove usefull for your project)*
* The `Bootstrap CSS` framework
* An `index.html` file that includes all preceding frameworks/libraires
* An `app.js` file that contains:
  * The main `angular` module, named `app`
  * A `config` function attached to this `app` module with one predefined route, `home`
* An almost blank `main.html` template, used by the `home` state

## The log in page

First, let's create an `html` template that will display a form, which we will use to log our user.

In the `templates` directory, create a new file called `login.html` and put in the following code:

```html
<form id="login" name="loginForm">
  <div class="form-group">
    <label for="username">Username</label>
    <input required type="text" id="username" class="form-control">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input required type="password" class="form-control" id="password">
  </div>
  <button class="btn btn-success">Log in</button>
</form>
```
> We will complete this template throughout the slides.

### Add the controller

To control this page, i.e. the form, the button and the data, we will need a controller.

In the `js` directory, create a new file called `login-ctrl.js`, and add in the following code:

```js
angular.module('app').controller('LoginCtrl', function() {
  var login = this;
});
```

> Don't forget to add a `<script>` tag in your `index.html` file that points to this file, after the inclusion of the main `app.js` file.

### Show it on the app

To link all this together and show our login page on our app, we need to add a new navigation state to our router.

The states definition are located in the main `app.js` file.

Open it and, right after the `home` state declaration, add a new state that points to the `login.html` template, with the `LoginCtrl` :

```js
// After home state
$stateProvider.state('login', {
    url: '/login',
    templateUrl: './templates/login.html',
    controller: 'LoginCtrl as login'
});
```
To try it, go to your app, and access the [url defined in this new state][login].

You should see the form.

> We do not use the HTML5 mode in this example. But if you'd like your url to not have the `#!` fragment, see [here][html5mode]

### Get the values

We will use this form to log on our user. For that, we will call the `POST /auth` URL of the Citizen Engagment API.

Tale a look a the [documentation for this URL][auth-url] to see what we'll need to send.

Using angular's two-way-binding, we can bind our form input values to a similar object in our controller.

In our `login-ctrl.js` add this at the end of the controller function:

```js
login.user = {};
```

In our `login.html`, use the `ng-model` directive to bind each input to this object:

```html
<input [...] id="username" [...] `ng-model="login.user.name"`>
```

```html
<input [...] id="password" `ng-model="login.user.password"`>
```

> Angular will automatically create the `name` and `password` property to the `user` object, event though we didn't explicitly declared them.

### Button click

These binded values will be used by a function triggered when our user click on the button to log himself in.

In `login-ctrl.js`, add this code at the end of the controller function:

```js
login.connect = function() {
  console.log(login.user);
};
```
And bind this function to the click on the button, using `ng-click`:

```html
<button class="btn btn-success" `ng-click="login.connect()"`>Log in</button>
```
> Try filling your form and clicking on the button with your console open

To ensure that the click is only possible when the form is valid, add this:

```html
<button [...] `ng-disabled="loginForm.$invalid"`>Log in</button>
```

## Manage the authentication

We will regularly check if our user is connected thoughout our app.

To manage this information, let's create an angular service that we'll call `AuthService`.

In the `js` directory, create a new file, called `auth-service.js`, and add this code:

```js
angular.module('app').factory('AuthService', function() {
  var service = {};

  return service;
});
```
> It doesn't do much for now...
> 
> Again, don't forget to add the `auth-service.js` file to your `index.html` script inclusions.

### Complete the service

With the [API auth documentation][auth-url], we know that we will receive a `token` when our user is logged in.

This token will then need to be sent along any other request.

So it could be a good idea to store this token in our `AuthService`.

Let's prepare it for that:

```js
angular.module('app').factory('AuthService', function() {
  var service = {
*   token: null,
*    
*   setToken: function(token) {
*     service.token = token;
*   }
*
*   unsetToken: function() {
*     service.token = null;
*   }
  };

  return service;
});
```
## Get the authentication token

To effectively get the token, we'll need :
* The angular `$http` service to call the API and retrieve the result
* Our brand new `AuthService` to store the token we'll receive
* The `$state` service to redirect the user when he's logged in

In `login-ctrl.js` add the correct dependencies to the controller:

```js
[...].controller('LoginCtrl', function(`AuthService, $http, $state`) {
```
Then, complete the `connect` function:

```js
login.connect = function() {
  $http({
    method: 'POST',
    url: 'https://citizen-api.herokuapp.com/api/auth',
    data: login.user
  }).then(function(res) {
    AuthService.setToken(res.data.token);
    $state.go('home');
  });
};
```
### Add error handling

Right now, if an error occurs, we don't do anything, which is not good.

What we'd like to do is catch any error and tell the user that something went wrong.

Let's add some HTML at the end of our `login.html`, which will not be visible unless `login.error` has a value:

```html
<div class="alert alert-danger" ng-if="login.error">{{ login.error }}</div>
```
And update our `connect` function in `login-ctrl.js`:

```js
login.connect = function() {
* delete login.error;
  $http({
    // ...
  }).then(function(res) {
    // ...
  })`.catch(function(error) {`
*   login.error = "Unable to log you."
*   console.log(error);
* });
};
```
## Restrict access

We can now use our `AuthService` to restrict access to our app to only logged in users.

This can be done in a `run` block, using the `$stateChangeStart` event of Angular UI Router:

Add this at the end of your `app.js` file:

```js
angular.module('app').run(function(AuthService, $rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (!AuthService.token && toState.name !== 'login') {
            event.preventDefault();
            $state.go('login');
        }
    });
});
```
> This basically detects any time the user tries to go to antoher state, and check if he's not logged in (`!AuthService.token`) and tries to go to any other state than the `login` one (`toState.name !== 'login'`).

> If this is the case, the transition is prevented (`event.preventDefault()`) and the user is redirected to the `login` state (`$state.go('login')`).

## Persist the token

You might have noticed that, every time you reload the app, you have to log in again.

That's perfectly normal: your `AuthService` is recreated each time, and thus the auth token is `null`.

To keep the connected state, we'll need to store this token in a more persistant manner, in this case the `localStorage`.

To follow the "*Angular Way*", we will not use the `localStorage` API directly, but rather use a library that provides a dedicated angular service.

This library is [Angular Storage][ng-store].

Download the `js` file [here][dl-ng-store], and save it in your `assets/js` directory.

> Don't forget to:
> * Include the `js` file in your `index.html` script inclusions
> * Register the `angular-storage` module in your `app` module dependencies

### Update our app

To use this persistant storage, we only need to update our `AuthService`, since it's responsible for token management.

```js
angular.module('app').factory('AuthService', function(`store`) {
  var service = {};
    token: `store.get('auth-token')`,
    setToken: function(token) {
      service.token = token;
*     store.set('auth-token', token);
    },
    unsetToken: function() {
      service.token = null;
*     store.remove('auth-token');
    }
  };

  return service;
});
```
> This way, each time we reload, the `AuthService` will try to get the `token` from `localStorage`.

> It the `auth-token` key doesn't exist, `token` will be `null` and the user will be considered as not logged in.

## Add a new page

To test all this, we will add a new page to our app, for the logged in user to go to.

Add a new file on the `templates` directory, name it `second.html` and add this markup:

```html
<h1>Second Page</h1>
<button class="btn btn-default">Log out</button>
```
Add a new `state` in `app.js`, after the `login` one:

```js
$stateProvider.state('second', {
    url: '/second',
    templateUrl: './templates/second.html'
});
```
> If you delete the `auth-token` key in your `localStorage` and try to reload the `/second` page, you should be redirected to the `/login` page instead.

## Log out

Now that we can log in, let's implement a log out feature.

To do so, we'll create a new controller, `LogoutCtrl`, in a `logout-ctrl.js` file inside the `js` directory, with this code:

```js
angular.module('app').controller('LogoutCtrl', function() {
  var logout = this;
});
```
This controller will have to delete the `token` from the `localStorage` when the user log out, and then redirect to the `login` page.

So it needs two dependencies:

```js
angular.module('app').controller('LogoutCtrl', function(`AuthService, $state`) {
```

> Don't forget, once again, to add the new file in your `index.html` inclusions.

### Add the function

The function that will be triggered when the user log out will be as follow:

```js
angular.module('app').controller('LogoutCtrl', function(AuthService, $state) {
  var logout = this;

* logout.disconnect = function() {
*   AuthService.unsetToken();
*   $state.go('login');
* }
});
```
We can now call this function by reacting to a click on the button inside the `second.html` page:

```html
<button 
  class="btn btn-default"
  `ng-controller="LogoutCtrl as logout"`
  `ng-click="logout.disconnect()"`>
  Log out
</button>
```
## Add the header

Nearly every URL of the Citizen Engagment API requires a logged in user to be executed.

So each time we make one of these calls in our app, we'll have to add an `Authorization` header, whose value should be `Bearer` followed by the auth token.

This can be easily done with the angular `$http` service.

For example, if we were to retrieve the list of issue types, we would do something like this:

```js
$http({
    method: 'GET',
    url: 'https://citizen-api.herokuapp.com/api/issueTypes',
*   headers: {
*       Authorization: 'Bearer ' + AuthService.authToken
*   }
}).then(/* ... */).catch(/* ... */)
```
> Adding manually this header for each API call will quickly become annoying. We can automate this using an angular interceptor.

## Interceptor 2000©

An **Interceptor** is nothing more than a special angular service, that will intercept an http call, an possibly manipulate it.

To create the interceptor, in the `js` directory, create a new `auth-interceptor.js` file, and add this:

```js
angular.module('app').factory('AuthInterceptor', function(AuthService) {
  return {
    request: function (config) {
      if (AuthService.token) {
        config.headers.Authorization = "Bearer " + AuthService.token;
      }
      return config;
    }
  }
});
```

This interceptor check if the user is logged in (`AuthService.token`) and, if it's the case, it add a new header to the request, with the correct syntax and the auth token.

> Again... include the file in `index.html`.

### Register the Interceptor

For the interceptor to kick in, you'll need to register it in your `$http` service.

To do that, in your `config` block in `app.js`, add a dependency to the `$httpProvider` and the following code at the end of the function:

```js
$httpProvider.interceptors.push('AuthInterceptor');
```
This tells the `$http` service that all requests must be given to `AuthInterceptor` prior to being executed.

You can now omit the `Authorization` header from your manual calls.

So the previous example could now be:

```js
$http({
    method: 'GET',
    url: 'https://citizen-api.herokuapp.com/api/issueTypes',
}).then(/* ... */).catch(/* ... */)
```
> No `Authorizazion` header! Yet it will still be applied, thanks to the **Inteceptor**.

## Conclusion

<!-- slide-front-matter class: middle -->

You now have a functionning authentication workflow that you can use for your Citizen Engagment Project.

You'll obviously have to adapt the given templates to your design and site.

**You can delete the `second.html` template and remove its corresponding state, as they are completely useless for your app.**

> The complete code for this course can be download from GitHub [here][solution].

> If you previously cloned the repo, you can just do:
```bash
$> git checkout solution
```

[ng]: ../angular
[ng-router]: ../angular-ui-router
[chrome]: https://www.google.com/chrome/
[sublime]: https://www.sublimetext.com/
[ng-storage]: https://github.com/auth0/angular-storage/blob/master/dist/angular-storage.min.js
[git-proj]: https://github.com/MediaComem/comem-webdev-angular-auth-starter
[html5mode]: ../angular-ui-router/#13
[login]: http://127.0.0.1:8080/#!/login
[auth-url]: https://mediacomem.github.io/comem-citizen-engagement-api/#auth_post
[second]: http://127.0.0.1:8080/#!/second
[dl-ng-store]: https://github.com/MediaComem/comem-webdev-angular-auth-starter/blob/solution/assets/js/angular-storage.min.js
[ng-store]: https://github.com/auth0/angular-storage
[solution]: https://github.com/MediaComem/comem-webdev-angular-auth-starter/tree/solution