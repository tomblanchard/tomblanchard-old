---
layout:   "single-blog-post"
category: "blog"

title:    "Contagious Grunt-itis"

image:    "contagious-gruntitis.gif"

excerpt:  "If you haven't heard of [Grunt](http://gruntjs.com) (if so, where have you been hiding?), it's a task runner powered by JavaScript and [Node.js](http://nodejs.org), don't worry, you don't have to be a JavaScript / Node.js developer to use Grunt"
---

{{ page.excerpt }} (just like you don't have to be a [Ruby](http://ruby-lang.org) developer to use [Sass](http://sass-lang.com)). You can use it for a **lot** of things thanks to the community for publishing so many plugins, a couple of examples being [Cssmin](http://github.com/gruntjs/grunt-contrib-cssmin) (CSS compression) and [Uglify](http://github.com/gruntjs/grunt-contrib-uglify) (JavaScript minification).

This post assumes you're at least a little bit familiar with Grunt so I'm not going to write up a tutorial on how to install Grunt and its dependencies, in a nutshell you set up your `Gruntfile.js` file and configure tasks and plugins to do what you want, when you want. When you've got all your tasks set up, you just run the `grunt` command (which runs the default task) and you're all set, or if you have multiple tasks you'd run `grunt task-name`.

Also, if you were wondering about the title of this post, it's reffering to the fact that ever since I had my Grunt "aha" moment I haven't been able to stop from myself sharing its power with people. Yep it's that awesome it even caused me to come up with that awfully lame form of wordplay!

## What I use Grunt for

On this site I use Grunt for a lot of things (short of dressing and feeding me), a lot of what I use it for on this site is very specific to this site as a whole and there will be a lot of things in there most projects won't need, I've heavily commented my `Gruntfile.js` file so it makes as much sense as possible and which snippets do which task and why I want them in place. I have also noted down which plugins I have used with links to them.

Below is my `Gruntfile.js` setup. I am constantly updating this to make things easier so instead of just copy and pasting the latest version I'm feeding the live [file](http://github.com/tomblanchard/tomblanchard.co.uk/blob/master/Gruntfile.js) straight from my [GitHub repository](http://github.com/tomblanchard/tomblanchard.co.uk):

<script src="http://gist-it.appspot.com/github/tomblanchard/tomblanchard.co.uk/blob/master/Gruntfile.js?footer=minimal">
</script>

<noscript><div class="flow"><p><a href="http://github.com/tomblanchard/tomblanchard.co.uk/blob/master/Gruntfile.js">No JavaScript? Shame on you! Here's a link to the file.</a></p></div></noscript>

So there you have it, go fourth and learn!