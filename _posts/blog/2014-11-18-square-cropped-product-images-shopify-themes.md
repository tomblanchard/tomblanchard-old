---
layout:   "single-blog-post"
category: "blog"

title:    "Using cropped (1:1 - square) product images in Shopify themes"

image:    "square-cropped-product-images-shopify-themes.gif"

excerpt:  "I recently worked on a Shopify theme project where images uploaded to the products on this store were all quite large in height compared to their width, a grid of the products looks something like"
---

{{ page.excerpt }} this:

![Product grid](/lib/img/blog/square-cropped-product-images-shopify-themes-product-grid.gif)

Shopify will generate a lot of images from each image uploaded to a product, all with different sizes, these sizes are documented [here](http://docs.shopify.com/themes/liquid-documentation/filters/url-filters#size-parameters). The problem I faced is that the different sized images generated all preserve the original aspect ratio (which is expected I guess), for example, if I uploaded an image which was `600x975px` and used the `large` generated size variation of this image it would be `295x480px` because the `large` image size returns the image at a *maximum* size of `480x480px` pixels whilst preserving the original aspect ratio. This is how you use the image with the preserved original aspect ratio:

{% highlight html %}{% raw %}
<img src="{{ image.src | img_url: 'large' }}" alt="{{ image.alt | escape }}">
{% endraw %}{% endhighlight %}

What if I wanted to use a square cropped version of this image like you can with WordPress? Well it turns out Shopify generates a `cropped` variation of each image uploaded to a product too, but for some reason this isn't documented anywhere. This is how you use the square cropped version of the image:

{% highlight html %}{% raw %}
{% assign cropped_img_size = 'large' %}
{% assign cropped_img = image.src | img_url: cropped_img_size | replace: '.jpg', '_cropped.jpg' | replace: '.gif', '_cropped.gif' | replace: '.png', '_cropped.png' %}

<img src="{{ cropped_img }}" alt="{{ image.alt | escape }}">
{% endraw %}{% endhighlight %}

The best thing about the cropped variation is that you can still use any of the already documented [image sizes](http://docs.shopify.com/themes/liquid-documentation/filters/url-filters#size-parameters), just change the `cropped_img_size` variable to what size you want. So the above code would spit out a `480x480px` image from any size image uploaded to the product, even very small images (below `480x480px`), small images get enlarged to fit the square. The only caveat I've found with this method is that you can't control the crop position, both the `x` and `y` axis crop positions default to `center` and cannot be changed.

## My use case

I needed this functionality because the product images needed to be responsive, what I mean by this is that on large displays the longer image should be displayed, but on smaller displays the square cropped image should be displayed instead ([art directed](http://usecases.responsiveimages.org/#art-direction) responsive images). This is how I did it on the `product.liquid` template; listing all the images uploaded to the product, with a little help from [Picturefill](http://scottjehl.github.io/picturefill).

{% highlight html %}{% raw %}
{% for image in product.images %}

  {% assign img = image.src | img_url: 'grande' %}
  {% assign cropped_img = img | replace: '.jpg', '_cropped.jpg' | replace: '.gif', '_cropped.gif' | replace: '.png', '_cropped.png' %}

  <picture>
    <source srcset="{{ img }}" media="(min-width: 768px)">
    <source srcset="{{ cropped_img }}" media="(max-width: 767px)">
    <img srcset="{{ img }}" alt="{{ image.alt | escape }}">
  </picture>

{% endfor %}
{% endraw %}{% endhighlight %}