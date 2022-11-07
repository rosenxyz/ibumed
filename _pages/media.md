---
layout: splash
title: "İbumed Hakkında Basında Çıkan Haberler"
excerpt: "Abant İzzet Baysal Üniversitesi Mezunları Derneği Basında"
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/hero_anasayfa.jpeg
  #overlay_filter: linear-gradient(rgba(255, 0, 0, 0.5), rgba(0, 255, 255, 0.5))
  #overlay_filter: rgba(13, 180, 185, 0.5)
  #overlay_filter: rgba(27, 163, 156, 0.9)
  overlay_filter: rgba(4, 147, 114, 0.9)
permalink: /media/
#layout: media
entries_layout: grid
classes: wide
author_profile: false
#entries_layout: grid
sidebar:
  - title: ""
    image: "/assets/images/baibu_logo.png"
    image_alt: "baibu_logo"
    text: ""
    nav: "docs"

---

<h2>Basında biz</h2>

<!-- {% for post in site.categories.media %}
  {% include archive-single.html type="grid"%}
{% endfor %} -->

{% for post in site.categories.media %}
  {% include archive-single.html type="grid"%}
{% endfor %}

<!-- type="grid" ekleyince post'lara thumnail ekleniyor. Bak: https://github.com/mmistakes/minimal-mistakes/issues/892 -->
