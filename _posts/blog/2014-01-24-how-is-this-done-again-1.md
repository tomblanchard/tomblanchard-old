---
layout:   "single-blog-post"
category: "blog"

title:    "1How is this done again? #1 - WordPress loop; posts in rows & columns"

image:    "how-is-this-done-again-1.gif"

excerpt:  "**\"How is this done again?\"**, those five words I'm noticing I'm asking myself more and more. A lot of the time when I'm working on a project I'll have to accomplish a specific task (which I have done"
---

{{ page.excerpt }} before) which I know how to do, but always forget the best way to go about it, I'm pretty sure I'm not the only one who's guilty of this (I hope!) Most of the time this ends up with me either going back to an older projects code and pasting it from there or having to completely rewrite it which sometimes doesn't even end up as efficient as the original code, both of these solutions aren't really ideal. I suppose I could just whack these easy forgettable tasks into a [GitHub Gist](https://gist.github.com) but instead I decided to start this tutorial themed post series so I can hopefully help out a few fellow developers who are in a similar position to me.

This post is focussed around the WordPress loop and manipulating it to display posts within rows and columns in a specific way. To clarify, I was working on a clients site and they wanted their posts to be displayed in a grid system where every two posts were contained in their own wrappers which acted as grid rows (`<div class="row"></div>`), so the HTML outputted by the loop had to be like so:

{% highlight html %}
<div class="row">
  <article>
    <a href="http://post-link">Post title</a>
  </article>
  <article>
    <a href="http://post-link">Post title</a>
  </article>
</div>

<div class="row">
  <article>
    <a href="http://post-link">Post title</a>
  </article>
  <article>
    <a href="http://post-link">Post title</a>
  </article>
</div>
{% endhighlight %}

## Cool, now where's the code!?

To accomplish the loop outputting the posts in this fashion I had to make use of the PHP `modulus` and `post-increment` operators, the loop I used is shown below (commented to clarify what each snippet is for):

{% highlight php %}
<?php if (have_posts()) : ?>

  <?php
    /**
     * Start post counter at 0.
     */
    $i = 0;
    while (have_posts()) : the_post();
    /**
     * Define the number of posts displayed per row.
     */
    $posts_per_row = 2;
    /**
     * HTML of the row opening & closing tags.
     */
    $open = '<div class="row">';
    $close = '</div>';
    /**
     * Output HTML of the row opening & closing tags when and where they should be
     * outputted.
     */
    echo !($i % $posts_per_row) && $i ? $close : '',
         !($i % $posts_per_row) ? $open : '';

    /**
     * Regular post loop stuff below.
     */
  ?>

    <article>
      <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
    </article>

  <?php
    /**
     * Update post counter throughout each post iterated over.
     */
    $i++;
    endwhile;
    /**
     * Output HTML of the row closing tag again (this is needed in case there aren't
     * the same number of posts in each row).
     */
    echo ($i) ? $close : '';
  ?>

<?php endif; ?>
{% endhighlight %}

Sorted, now the posts are perfectly contained in their own rows and columns and there's never any unclosed HTML elements etc. (some other tutorials on how to accomplish this fall victim to this.) All HTML outputted is always valid and one of the best things about this is that it works perfectly with pagination, I thought it would throw a spanner in the works but nope, it just works.

## This has other uses to!

I've found this  method can also be useful when you need to display posts in a carousel / slideshow, I did this when I developed a re-design of a clients site, one of the features were that the posts were displayed by their thumbnail inside an image carousel using the jQuery plugin [Cycle2](http://jquery.malsup.com/cycle2), you can see that in action on the live site [http://goo.gl/5Gglb2](http://goo.gl/5Gglb2). The HTML the loop outputted the posts in had to be structured like so:

{% highlight html %}
<ul>
  <li>
    <img src="http://post-thumbnail" alt="">
  </li>
  <li>
    <img src="http://post-thumbnail" alt="">
  </li>
  <li>
    <img src="http://post-thumbnail" alt="">
  </li>
</ul>

<ul>
  <li>
    <img src="http://post-thumbnail" alt="">
  </li>
  <li>
    <img src="http://post-thumbnail" alt="">
  </li>
  <li>
    <img src="http://post-thumbnail" alt="">
  </li>
</ul>
{% endhighlight %}

All I needed to do to accomplish this was to change a few loop variables; `$posts_per_row` to `3`, `$open` to `<ul>`, `$close` to `</ul>` and voila, done!

I'll no doubt be back extending the **"How is this done again?"** post series soon, I seem to be way too good at forgetting code not to.