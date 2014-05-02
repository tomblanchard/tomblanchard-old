---
layout:   "single-blog-post"
category: "blog"

title:    "Sassy, media query specific CSS objects"

image:    "sassy-media-query-specific-css-objects.gif"

excerpt:  "If you're an advocate of OOCSS (Oriented CSS) then you have most likely worked with Sass before as it makes development of OOCSS a lot more efficient. Here's a simple example of an object (stolen"
---

{{ page.excerpt }} / slightly modified from [inuit.css](https://github.com/csswizardry/inuit.css/blob/master/objects/_nav.scss)):

{% highlight scss %}
.nav {
  margin-left:0;
  margin-bottom:0;
  list-style:none;

  > li {
    &,
    > a {
      display:inline-block;
       *display:inline;
      zoom:1;
    }
  }
}
{%endhighlight%}

This object turns a regular unordered list into a horizontal row of list items, mostly for use in navigation menus. To use this I can just drop in a class in my HTML like so:

{% highlight html %}
<ul class="nav">
  <li><a href="/home">Home</a></li>
  <li><a href="/about">About</a></li>
  <li><a href="/contact">Contact</a></li>
</ul>
{%endhighlight%}

Alternatively I can use Sass's `@extend` directive like so:

{% highlight scss %}
.menu {
  @extend .nav;
}
{%endhighlight%}

Just recently I've worked on a lot of responsive front-end projects in which the design briefs I'm supplied with involve usage of certain CSS objects that are only active in-between specific breakpoints. If Sass enabled usage of the `@extend` directive inside media queries then I could just do something like:

{% highlight scss %}
.menu {
  @media (min-width:768px) and (max-width:1023px) {
    @extend .nav;
  }
}
{%endhighlight%}

This throws the following error:

    You may not @extend an outer selector from within @media.
    You may only @extend selectors within the same directive.

My work around for this is changing the way I author my objects in the first place, instead of limiting the object from just being contained in a class (which limits usage to either a class in the HTML or the `@extend` directive in Sass) also have it in a mixin, like so:

{% highlight scss %}
@mixin nav {
  margin-left:0;
  margin-bottom:0;
  list-style:none;

  > li {
    &,
    > a {
      display:inline-block;
       *display:inline;
      zoom:1;
    }
  }
}
.nav { @include nav; }
{%endhighlight%}

Now when I want to use this object I have three options, I can either drop a class in the HTML, `@extend` it and thanks to the mixin and I can now `@include` it. The good thing about mixins is that they can be used pretty much anywhere, even inside of media query blocks, so say I wanted a `.nav` object which was only active in-between a certain media query I can do it like so (the `tablet` class prefix is just for brevity, make sure the actual media query specific class names have [context](http://css-tricks.com/naming-media-queries)):

{% highlight scss %}
@media (min-width:768px) and (max-width:1023px) {
  .tablet-nav {
    @include nav;
  }
}
{%endhighlight%}

This makes it all a lot more [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself), there are other ways of doing this like having the object styles active at all times and then undoing those styles during specific media queries but that it far from ideal, but yeah this is my take on the solution and it seems to work quite well. I have open-sourced my own [personal front-end boilerplate](https://github.com/tomblanchard/boilerplate) which makes use of this CSS object authoring method, so if you want to check out more examples (including objects with sub-components etc.) then [be my guest](https://github.com/tomblanchard/boilerplate/tree/master/src/scss/framework/objects).