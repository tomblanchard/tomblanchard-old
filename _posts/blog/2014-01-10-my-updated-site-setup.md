---
layout:   "single-blog-post"
category: "blog"

title:    "My updated site setup"

image:    "my-updated-site-setup.jpg"

excerpt:  "This site has been live for quite a while now (around six months) and I've only ever published one blog post before this and the purpose of that post was just to announce the new site launch. I never felt"
---

{{ page.excerpt }} any motivation to blog and I think I know why, it was because how awful my setup was, I wasn't using Jekyll to its full potential and in all honesty, I had no idea how to properly implement Jekyll into the new site design. I wasn't even using the built in blog-aware features, the only purpose I was using Jekyll for was for the templating functionality which isn't very smart when it comes to writing blog posts as I was having to code them in HTML every time.

Anyway, out with the old, in with the new. From the outside this site is no different to how it was six months ago, it looks exactly the same, however, how I maintain it has changed dramatically and I couldn't be happier as it makes publishing content not such a drag.

## Embracing Jekyll

I wanted this site to run a lot like a WordPress powered site (which is a lot to ask for with a static site generator), the main things being custom post types and category archives. Setting up the "custom post types" (quoted because they're just categories with clever permalinks, using this technique [http://goo.gl/5ZEdhr](http://goo.gl/5ZEdhr)), one for my portfolio work items and one for blog posts. This wasn't that much of a challenge, but I decided I wanted Jekyll category archives along with pagination which threw a spanner in the works because 1: by default Jekyll doesn't automatically generate category archives and 2: pagination only works on the home `index.html`. After a lot of researching I came across this article [http://goo.gl/uXF48J](http://goo.gl/uXF48J) which solved these problems (with a little tweaking).

Another thing which I ran into problems with was the HTML structure of my blog post archive pages as they were nested in grids and rows, simplified I needed my post `for` loop to output posts like this (simplified):

{% highlight html %}
<div>
  <a href="#">Blog Post 1</a>
  <a href="#">Blog Post 2</a>
</div>

<div>
  <a href="#">Blog Post 3</a>
  <a href="#">Blog Post 4</a>
</div>
{% endhighlight %}

This isn't simple to do, I shamelessly turned to Stack Overflow which gave a few answers, but then I found this after a few days which was pretty much exactly what I needed [http://goo.gl/KmhO0y](http://goo.gl/KmhO0y), it uses `modulo` functionality to work out which post is which.

So now, I have all of my blog posts and work items neatly organised in their own sub-directories in the Jekyll `_posts` directory in properly formatted Markdown files with working archives for each post type, complete with working pagination, smooth!

Jekyll isn't so great at formatting dates without added functionality either, specifically when it comes to ordinalized naming of days (the part after the day; "nd" "st" and "th"), researching whether or not this was possible in Jekyll brought me here [http://goo.gl/RcmKh6](http://goo.gl/RcmKh6) which shows how it can be done.

When I thought I'd got my perfect Jekyll setup with the new site I was going through it seeing if there was any more content I'd like to update / maintain without touching the HTML, this brought me to the footer section, specifically the list of services and client testimonials. Turns out you can define your own variables in the `_config.yml` file (which are available in every template), which is exactly what I did. YAML supports arrays / lists so I added one array "testimonials" and the other "services", imported all the data into those arrays, added a couple of `for` loops in my footer in replace of the raw HTML and accessed the "testimonials" / "services" arrays using:

{% highlight html %}
{% raw %}{% for testimonial in site.testimonials %} {% endfor %}{% endraw %}

{% raw %}{% for service in site.services %} {% endfor %}{% endraw %}
{% endhighlight %}

Pretty cool huh!?

## jQuery - be gone!

Another idea I've been toying with recently was dropping jQuery from the site because the only reason I was using it was for the testimonial rotator in the footer, so I did it, with a little help from [Todd Motto](http://toddmotto.com)'s [Apollo.js](https://github.com/toddmotto/apollo) (a tiny < 1KB standalone DOM class manipulation API). So the site is now completely jQuery-less, feels good to replace 90KB worth of jQuery (99% of it I wasn't even using) with 1KB worth of relevant vanilla JavaScript.

## Overcoming the fear of Grunt

Last but not least, I have changed my asset workflow (tasks like minification, compilation, linting, etc.) I used to use [Mixture](http://mixture.io) (I still love this app) to compile my Sass to CSS and minify / uglify my JavaScript files manually which was a very cumbersome task. However after a lot of time of being afraid of [Grunt](http://gruntjs.com); the JavaScript task runner I finally tried it out and I couldn't love it more. I use it to compile my Sass, minify / uglify my JavaScript, build my Jekyll site files, minify all the Jekyll site HTML files and then watch all necessary files and run specific tasks when specific files are changed, I do all that in one command `grunt`, so awesome. I could write paragraph after paragraph about Grunt but I'll leave that for another day (post).

## Show me the source!

If you want to poke around the code for this setup, you can see it over on my GitHub here: [tomblanchard.co.uk](http://github.com/tomblanchard/tomblanchard.co.uk).