---
layout:   "single-blog-post"
category: "blog"

title:    "Making IE &#60; 9 behave with responsive development"

image:    "making-old-ie-behave-with-responsive-development.gif"

excerpt:  "Responsive web development can be tricky at the best of times, but even more so if the site in question has to support any version of Internet Explorer below version 9 (most of the time it's just"
---

{{ page.excerpt }} IE 8 you need to tame due to the low usage statistics of IE <= 7). Old IE makes things harder because media queries (the backbone of responsive websites) aren't supported, so all code inside media query blocks is ignored. Below are the various solutions I've tried out which I wasn't 100% happy with:

- JS based media query polyfills ([Respond.js](https://github.com/scottjehl/Respond), [css3-mediaqueries.js](https://code.google.com/p/css3-mediaqueries-js/))<br>**- Performance issues, also what about users with no JS and old IE?**
- [Mobile-first / progressive enhancement](http://www.jonikorpi.com/leaving-old-IE-behind/)<br>**- This is a great solution, I use a similar method on this site, but what if the client insists the layout needs to look the same on both modern browsers and old IE?**
- Only ever using `max-width` based media queries<br>**- On larger sites this will lead to horrible CSS as it will require a lot of style resetting at certain breakpoints.**

The solution I've found to be the best does require a bit of setup but once you're up and running supporting old IE has never been so easy. It also require Sass, in my opinion this functionality alone is enough to try Sass if you haven't before (yes, this solution is that useful). In it's simplest form the file structure consists of:

    - project/
      - css/
        - _base.scss
        - _config.scss
        - lt-ie-9.scss
        - style.scss
      - index.html

`_base.scss` is the file which contains all of your SCSS / CSS, you can write it straight into there or if you prefer to be modular about it you can import all of your CSS components into that file. With no project CSS thrown in there all it's doing is importing the `_config.scss` file:

{% highlight scss %}
@import "config";
{% endhighlight %}

`_config.scss` contains a map of your common breakpoints along with a media query mixin:

{% highlight scss %}
/**
  Specify breakpoints here.
 */
$breakpoints: (
  'small':    '(min-width: 480px)',
  'medium':   '(min-width: 768px)',
  'large':    '(min-width: 1024px)'
);

@mixin media-query($media-query, $lt-ie-9-support: false) {
  /**
    If we're not in the old IE stylesheet, then output the media query block.
   */
  @if $is-lt-ie-9-stylesheet == false {
    @each $name, $declaration in $breakpoints {
      @if $media-query == $name and $declaration {
        @media only screen and #{$declaration} {
          @content;
        }
      }
    }
  }
  /**
    If the media query has been set to support old IE and we are in the old IE
    stylesheet, then output the code inside the media query block but strip the
    actual media query from around it.
   */
  @if $lt-ie-9-support == true and $is-lt-ie-9-stylesheet == true {
    @content;
  }
}
{% endhighlight %}


`lt-ie-9.scss` consists of the following, this file will compile to `lt-ie-9.css` when ran through a Sass compiler:

{% highlight scss %}
$is-lt-ie-9-stylesheet: true;

@import "base";
{% endhighlight %}

`style.scss` consists of the following, this file will compile to `style.css` when ran through a Sass compiler:

{% highlight scss %}
$is-lt-ie-9-stylesheet: false;

@import "base";
{% endhighlight %}

Almost done now, the last step is to add the reference to the CSS files into the HTML like so:

{% highlight html %}
<!--[if (lt IE 9) & (!IEMobile)]>
  <link rel="stylesheet" href="css/lt-ie-9.css">
<![endif]-->
<!--[if (gte IE 9) | (IEMobile)]><!-->
  <link rel="stylesheet" href="css/style.css">
<!--<![endif]-->
{% endhighlight %}

This tells the browser which CSS file to use based on what browser the page is being view on, if the browser is IE and below version 9 it will load `lt-ie-9.css`, however if the browser is either IE version 9 and above or not IE at all it will load `style.css`.

## Usage

In `_base.scss` you'd write your SCSS / CSS as per normal but when you want to use a media query you'd do it like so:

{% highlight scss %}
.element {
  @include media-query(small) {
    width:50%;
  }
}
{% endhighlight %}

If you want the code in the media query to be read by old IE then you just simply add a second argument of `true` to the `media-query` `@include` like so:

{% highlight scss %}
.element {
  @include media-query(small, true) {
    width:50%;
  }
}
{% endhighlight %}

The above code will output the following in the `style.scss` file:

{% highlight css %}
@media only screen and (min-width: 480px) {
  .element {
    width:50%;
  }
}
{% endhighlight %}

And the following in the `lt-ie-9.scss` file, stripping the media query wrapped around it:

{% highlight css %}
.element {
  width:50%;
}
{% endhighlight %}

There you have it, almost no effort required to make old IE behave with media queries, I've used this method in a few projects of mine now and I haven't had any issues at all. I actually use this method by default on my personal front-end boilerplate which you can check out [here](https://github.com/tomblanchard/boilerplate/tree/master/src/scss).

## Other uses

This isn't just useful for responsive stuff either, it can also be used as an alternative to [Paul Irish](https://twitter.com/paul_irish)'s IE [conditional classes](http://www.paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither) on the `<html>` element. With this method you'd target elements being viewed in a specific version of IE like so:

{% highlight scss %}
.element {
  /*html*/.lte9 & {
    width:50%;
  }
}
{% endhighlight %}

The problem with that method is the IE specific styles would get loaded be the browsers no matter what browser it is, downloading CSS which doesn't get used is just wasted bytes which can add up and cause a slow-loading site. With the Sass method you'd do it like:

{% highlight scss %}
.element {
  @if $is-lt-ie-9-stylesheet == true {
    width:50%;
  }
}
{% endhighlight %}

Or if you want CSS outputted only in the non-IE stylesheet you'd do:

{% highlight scss %}
.element {
  @if $is-lt-ie-9-stylesheet != true {
    width:50%;
  }
}
{% endhighlight %}

This way the browser specific CSS only ever gets loaded by the browser which actually needs it, awesome right?