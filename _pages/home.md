---
layout: splash
permalink: /
hidden: true
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/hero_anasayfa.jpeg
  #overlay_filter: linear-gradient(rgba(255, 0, 0, 0.5), rgba(0, 255, 255, 0.5))
  #overlay_filter: rgba(13, 180, 185, 0.5)
  #overlay_filter: rgba(27, 163, 156, 0.9)
  overlay_filter: rgba(4, 147, 114, 0.9)
  actions:
    - label: "Üye Ol"
      url: "/uyelik/"
excerpt: >
  Abant İzzet Baysal Üniversitesi Mezunları Derneği Resmi Web Sitesidir. İzzet Baysal’ın eğitim dünyasında açtığı yolda ilerleyerek, üniversitemizin kuruluşundan itibaren tüm mezunlarına ulaşmayı ve mezunlar arasında iletişim ve beraberliği sağlamayı hedefliyoruz. Seni de aramızda görmek isteriz.<br />

feature_row:
  - image_path: /assets/images/students.jpeg
    alt: "Abant İzzet Baysal Üniversitesi Mezunları Derneği İBUMED"
    title: "Hoş Geldiniz"
    excerpt: "Abant İzzet Baysal Üniversitesi Mezunları Derneği İBUMED, 2010 yılından bu güne mezunlar arasında, mezunlar ve öğrenciler arasında kurduğu iletişim ve birliktelik ile faaliyetlerine devam ediyor. Eğer siz de Abant İzzet Baysal Üniversitesi'nin mezunlarından biriyseniz, mutlaka bize katılın!"
    url: "/uyelik/"
    btn_class: "btn--primary"
    btn_label: "Üye Ol"
  - image_path: /assets/images/scholarship.jpeg
    alt: "İBUMED burs imkanı"
    title: "Burs Çalışmaları"
    excerpt: "İBUMED olarak her yıl birçok AİBU öğrencisine burs imkanı sağlıyoruz. AİBÜ Mezunu olarak sen de dikkat ve titizlikle belirlenmiş, gerçek ihtiyaç sahibi bir AİBÜ son sınıf öğrencisine yardım etmek ister misin?"
    url: "/iletisim/"
    btn_class: "btn--primary"
    btn_label: "Sorunu Sor"
  - image_path: /assets/images/form.jpeg
    alt: "İBUMED Burs Başvuru Formu"
    title: "Burs Başvuru Formu"
    excerpt: "Bir AİBU öğrencisi olarak, İBUMED bursundan faydalanmak için Bursiyer Başvuru Formu'nu doldurup bize iletebilirsin."
    url: "/assets/docs/ibumed_burs_basvuru_formu.pdf"
    btn_class: "btn--primary"
    btn_label: "Başvuru Formunu İndir"    
feature_row2:
  - image_path: /assets/images/izzet-baysal.jpeg
    alt: "izzet baysal"
    title: "Saygı ve Özlemle"
    excerpt: "1907 yılında Bolu'da dünyaya geldi. İlk ve orta öğrenimini Bolu'da, yüksek öğrenimini İstanbul Güzel Sanatlar Akademisi'nde Mimar olarak tamamladı. Yıllarca İstanbul'da en fazla gelir vergisi veren ilk on kişi arasında yer aldı. 'En büyük eserimdir' dediği İzzet Baysal Vakfı'nı, vergisi ödenmiş kazançlarından tahsis ederek 1987 yılında kurdu."
    url: "https://izzetbaysalvakfi.org.tr/izzet-baysal/hayati"
    btn_label: "Hakkında"
    btn_class: "btn--primary"  
---

{% include feature_row %}

{% include feature_row id="feature_row2" type="left" %}

## Güncel Haberler

<div class="grid__wrapper">
{% for post in site.posts limit: 8 %}
  {% include archive-single.html type="grid"  %}
{% endfor %}
</div>
