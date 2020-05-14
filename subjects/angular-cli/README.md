# Getting Started with Angular CLI

<!-- slide-front-matter class: center, middle -->

## Summary

Get introduced to an essential tool when working with Angular: the official CLI.

<!-- slide-include ../../BANNER.md -->

**You will need**

- [Google Chrome][chrome] (recommended, any browser with developer tools will do)
- [Visual Studio Code][vscode] (recommended, although any editor could do)
- [Node.js][node] installed on your machine


**Recommanded reading**

- [Command Line Introduction][cli]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Why the need for a CLI?](#why-the-need-for-a-cli)
- [Install the CLI](#install-the-cli)
- [Create a new blank project](#create-a-new-blank-project)
- [Run the application](#run-the-application)
- [Generate files](#generate-files)
- [Install dependencies](#install-dependencies)
- [Build your app](#build-your-app)
- [Update core Angular packages](#update-core-angular-packages)
- [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Why the need for a CLI?

Angular is a framework that uses **many advanced frontend technologies** (ES6+ features, TypeScript, Sass, ...) that give developers a better coding experience.

But those technologies are **not or only partially supported by modern browsers**. This means that the source code written using the Angular framework must be converted (or **compiled**) to "standard" HTML/CSS/JS files then **bundled** to be served to the broader range of browser.

Doing so requires the use and configuration of many tools that can be (very) tedious to set up manually.

The [Angular CLI][ng-cli] has a command to **create a blank startup project** that has all this config ready to go.

> It also adds several very useful utilities (like code generation), wether you're developping a web application of an Angular library.

## Install the CLI

To install the latest version of the Angular CLI, run the following command:

```bash
$> npm i -g @angular/cli
```
Once installed, you should be able to call the Angular CLI from any location on your filesystem with the `ng` command, i.e.:

```bash
$> ng version
```
> If you don't want to install it globally, since the CLI itself is a dependency of any Angular project, you could just use `npx` to create a blank project, then use `npm run ng` inside the project directory to call the locally installed CLI.

> We will not use this method in this subject

## Create a new blank project

To create a new blank project, simply run the following command in your terminal:

> This will create a new directory in the location where the command is executed

```bash
$> ng new
```
You'll then be asked to:
- provide a name for your new application (let's say `Playground`)
- wether you want to use [Angular routing][ng-router] (let's say `y`es)
  > See the subject on [Angular routing][ng-routing]
- which CSS preprocessor you want to work with, or none (let's select `SCSS`)

The CLI will create the project directory, its default arborescence and all the necessary files to get you up and running, then all the project dependencies.

Once its done, you can go to your new project directory (`cd Playground`) and start working.

## Run the application

Run the following command from and Angular project to:
- Compile the different files into standard HTML/CSS/JS
- Bundle the compiled files
- Serve them through a local server
- Start watchers that will rerun the whole process whenever a file is saved

```bash
$> ng serve
```
> This command starts a process that will not stop until you kill it.
> Open a new terminal to call other commands

## Generate files

One of the command you'll likely use the most is the one that allows you to generate basic Angular elements (components, directives, services, modules, etc):

```bash
$> ng generate <elementType>
```
> See the [Getting started with Angular][ng-start] to learn more about those different elements

Depending on the `<elementType>` this will generate one or several files and/or directories and update existing files if applicable.

To try and see what would be generated (and especially **where**), remember to add the dry run option at the end of the command:

```bash
$> ng generate <elementType> `--dry-run`
```
> This **won't** generate anything but log what would have been

## Install dependencies

You'll probably need to **install external packages** to use in your application along the road.

Since those packages will certainly be `npm` packages, you might be tempted to simply use `npm install` to get them.

**Do not.**

When working with Angular, you should use the following command as **a complete replacement**:

```bash
$> ng add <package>
```
Packages developped specifically for Angular application can add features to the Angular CLI or configure themselves in your application.

These additionnal set up will **not be triggered** if the package is installed using `npm install`.

> `ng add` does exactly what `npm install` do **AND** executes those additionnal set up steps.

## Build your app

When you need to make a **release** of your application, you can use this command:

```bash
$> ng build
```
It does many things under the hood to prepare your app for a deployment on a distant server, like:
- **compiling** your code for production (more checks are conducted to ensure the best possible quality)
- **minifying and bundling** your JS scripts and (S)CSS files
- gathering static assets (such as images)
- packaging your app for different ECMAscript versions, to maximize compatibility with older browsers

> The resulting build can be found in the `dist/` directory

## Update core Angular packages

That one is not often used but nonetheless very precious:

```bash
$> ng update
```
Using this command, Angular CLI will scan your project and tell you which core Angular packages could be updated to newer version.

You'll then be able to tell the CLI to propertly update those packages along with your project configuration.

> This method is safer than manually doing `npm update` on the core packages yourself.

## Resources

The Angular CLI has more command at your disposal for more specific use cases.

Don't hesitate to check it out.

[Angular CLI Documentation][ng-cli]

[chrome]: https://www.google.com/chrome/
[cli]: https://mediacomem.github.io/comem-archidep/latest/subjects/cli/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[ng-cli]: https://cli.angular.io/
[ng-routing]: ../subjects/angular-routing/
[ng-router]: https://angular.io/guide/router
[ng-start]: https://mediacomem.github.io/comem-devmobil/latest/subjects/angular/?home=https%3A%2F%2Fmediacomem.github.io%2Fcomem-masrad-dfa%2Flatest
[node]: https://nodejs.org
[vscode]: https://code.visualstudio.com/
