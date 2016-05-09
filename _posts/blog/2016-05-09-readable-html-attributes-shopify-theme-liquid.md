---
layout:   "single-blog-post"
category: "blog"

title:    "Keeping HTML attributes readable within a Liquid-riddled Shopify theme"

image:    "readable-html-attributes-shopify-theme-liquid.png"

excerpt:  "I hate working with most existing \"off the shelf\" Shopify themes for a few reasons, one of the main annoyances are gigantic if/else statements or other long logic inside HTML attributes, I've a little convention to stick by which helps this"
---

After spending a fair amount of time spent tweaking existing "off-the-shelf" Shopify themes, I've come to realise one of my biggest annoyances with them (most of them anyways, some of them are genuinely beautifully coded.) It's not the lack of CSS structure / conventions, it's not the massive spaghetti code Javascript file, it's not even the never-ending theme settings (newsflash: no site needs over 20 colour options); it's the ridiculously long HTML attributes filled with Liquid logic.

What I'm talking about looks something like this:

{% highlight html %}{% raw %}
<div class="collection-banner" style="{% if settings.collection_header_bg_color != blank %}background-color: {{ settings.collection_header_bg_color }};{% endif %} {% if collection.image %}background-image: url('{{ collection.image | img_url: 'master' }}');{% endif %}">
  <div class="columns sixteen {% if settings.collection_image_text_align == 'left' %}text-align-left{% elsif settings.collection_image_text_align == 'right' %}text-align-right{% else %}text-align-center{% endif %}">
    <h1 class="headline" style="{% if settings.collection_image_text_color != blank %}color: {{ settings.collection_image_text_color }};{% endif %}">
      {{ collection.title }}
    </h1>

    <p class="subtitle" style="{% if settings.collection_image_text_color_2 != blank %}color: {{ settings.collection_image_text_color_2 }};{% endif %}">
      {{ collection.description }}
    </p>
  </div>
</div>
{% endraw %}{% endhighlight %}

I can't express how much I loathe working with code like the above, the logic-filled HTML attributes cause so much unreadability, it's a mess and it makes debugging a bit of a nightmare.

I've started to use a little convention to avoid this problem, it involves creating a lot of variables, but separates the logic from the attributes pretty nicely. The above [bad] code could be re-factored to the following [improved] code:

{% highlight html %}{% raw %}
{% assign bg_color = settings.collection_header_bg_color %}
{% assign bg_color_style = "background-color:" | append: bg_color | append: ";" %}
{% if bg_color == blank %} {% assign bg_color_style = "" %} {% endif %}

{% assign bg_image = collection.image %}
{% assign bg_image_src = bg_image | img_url: "master" %}
{% assign bg_image_style = "background-image: url(" | append: bg_image_src | append: ");" %}
{% unless bg_image %} {% assign bg_image_style = "" %} {% endunless %}

{% assign text_align = settings.collection_image_text_align %}
{% assign text_align_class = "text-" | append: text_align %}

{% assign headline_color = settings.collection_image_text_color %}
{% assign headline_color_style = "color:" | append: headline_color | append: ";" %}
{% if headline_color == blank %} {% assign headline_color_style = "" %} {% endif %}

{% assign description_color = settings.collection_image_text_color_2 %}
{% assign description_color_style = "color:" | append: description_color | append: ";" %}
{% if description_color == blank %} {% assign description_color_style = "" %} {% endif %}

<div class="collection-banner" style="{{ bg_color_style }} {{ bg_image_style }}">
  <div class="columns sixteen {{ text_align_class }}">
    <h1 class="headline" style="{{ headline_color_style }}">
      {{ collection.title }}
    </h1>

    <p class="subtitle" style="{{ description_color_style }}">
      {{ collection.description }}
    </p>""
  </div>
</div>
{% endraw %}{% endhighlight %}

There we go, our logic and markup are completely separated now. You could argue that at 31 lines of code, this brings in the re-factored version at almost three times the size of the original 11 line version and that this is "bad", but it really isn't; more lines of code != worse code, in this case it's 10x more readable and pretty much self-documenting, which is awesome!

As long as the above code is kept in it's own snippet (something like `snippets/collection-header.liquid`), as most of the main components of each template should be, then I think it's completely fine. It's not like we're adding bloat to the front-end and sacrificing load times for a little developer convenience / code readability, we're just throwing a few more lines of Liquid at the blazing fast Shopify servers, which is no biggie at all.