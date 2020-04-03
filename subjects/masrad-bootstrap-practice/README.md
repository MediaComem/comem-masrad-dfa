# Bootstrap Practice

<!-- slide-include ../../BANNER.md -->

Hands-on practice on the use of Bootstrap to create a WebPage.

**You will need**

* [Google Chrome][chrome] (recommended, any browser with developer tools will do)
* [Sublime Text][sublime] (recommended, any code editor will do... **except Notepad**)
* [Live-Server][ls] (should already be installed)

**Recommended reading**

* [Project setup][projset]
* [Bootstrap][bb]
* [Bootstrap - Layout management][blm]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [What to do?](#what-to-do)
- [How to approach it?](#how-to-approach-it)
- [Custom CSS](#custom-css)
- [References](#references)
- [Disclaimer](#disclaimer)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What to do?

1. Create a new project directory in your file system (`bootstrap-practice`)
2. Download the [basic HTML template][bht] and save it as `index.html`
3. **Using only Bootstrap classes, recreate the following page:**

> Click on the image to see it full-screen.

<a class="center" href="images/template.jpg" target="blank"><img src="images/template.jpg" class="shadow" width="70%" /></a>

## How to approach it?

The steps could be:

1. Analyze very thoroughly the screenshot
2. Try and determine the major "blocks" of the layout
3. Try and determine how you will use the grid system
4. Start by the navbar and footer
5. Follow this by creating the list
6. End by the "discussion zone"

## Custom CSS

**You don't have to add any additionnal CSS!**

This practice was only realised using Bootstrap classes.

Try to do the same.

> The **ONLY** custom CSS needed is the one that adds the margin on the content, due to the navbar being fixed to the top.

```css
main { margin-top: 60px; }
```

You can add this CSS directly in a `<script>` tag at the end of your `<head>` element, or create a new CSS file; your choice.

## References

This exercice will require you to use:

* Navbar
* List
* Panel
* Form
* Grid System

> To complete this practice, you'll need to look up in the documentation how to use:
* [Labels][labels]
* [Alerts][alert]
* [Button groups][btn-group]
* [Simple text in navbar][nav-text]
* [Nested columns][nest]
* the `active` class on the navbar and the list-group elements

## Disclaimer

<!-- slide-front-matter class: center, middle, image-header -->

> **Ask questions before throwing your computer through the window.**

> Bootstrap can be quite frustrating some times ;)

[bht]: https://gist.githubusercontent.com/Tazaf/420a368389367a83fcfb96ab3a51bf8a/raw/1c5af02f1dd3248189b8e6869a02c5133232db7b/index.html
[labels]: http://getbootstrap.com/components/#labels
[alert]: http://getbootstrap.com/components/#alerts
[btn-group]: http://getbootstrap.com/components/#btn-groups
[nav-text]: http://getbootstrap.com/components/#navbar-text
[nest]: http://getbootstrap.com/css/#grid-nesting
[bb]: ../bootstrap
[blm]: ../bootstrap-layout-management
[projset]: ../masrad-project-setup
[sublime]: https://www.sublimetext.com/
[chrome]: https://www.google.com/chrome/
[ls]: https://www.npmjs.com/package/live-server