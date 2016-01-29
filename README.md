## Website Performance Optimization portfolio project

This is the completed project for Udacity's [Critical Rendering Path course](https://www.udacity.com/course/ud884).

Hosted on [Github pages](http://thisbejim.github.io/webop/).

### Use
Requires [gulp](http://gulpjs.com/).

1. Clone this repository

2. npm install

3. gulp build

4. Open dist/index.html (preferred) or use gulp serve

### Optimizations

#### Critical Rendering

Inline styles, async script fetching, minification.

#### Frame Rate

Get elements by class with document.getElementsByClassName rather than document.querySelectorAll.

Get .mover elements only once rather than during every updatePositions call.

Get document.body.scrollTop just once, rather than on each iteration.

Change amount of background pizzas generated from 200 to 39.