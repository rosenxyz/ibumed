# İBUMED — Yeni Site (Jekyll'siz, statik HTML/CSS/JS)

Bu klasör, eski Jekyll tabanlı İBUMED sitesinin **tamamen özgün, modern ve
bağımsız bir statik siteyle** yeniden yapılmış halidir. Jekyll, Ruby veya
herhangi bir derleme aracı gerekmez.

## Neler var

- **Tasarım tamamen özgün** — "Abant" teması: çam yeşili + Abant Gölü mavisi +
  akademik altın vurgu, Fraunces/Manrope/IBM Plex Mono tipografisi, gerçek
  İBUMED logosu (nav, footer ve anasayfa hero'sundaki dönen amblem çerçevesi
  içinde).
- **Çift dilli (TR/EN)** — sağ üstteki düğmeyle tüm site anında dil değiştirir.
  Hukuki sayfalar dahil tüm metinler çift dilli.
- **Çerez onay sistemi** — sayfa altında beliren banner (Tümünü Kabul Et /
  Sadece Gerekli / Çerez Ayarları) ve dört kategorili (Gerekli, Analitik,
  Reklam, Pazarlama) bir ayarlar penceresi. Tercih gerçekten işlevseldir:
  `hasConsent('analytics')` gibi bir çağrı, kullanıcı o kategoriye onay
  vermediyse `false` döner — ileride eklenecek herhangi bir analitik/reklam
  betiği bu kontrolden geçmelidir. Şu an sitede böyle bir betik **yoktur**.
- **3 hukuki sayfa** — Gizlilik Politikası, Kullanım Şartları, Çerez
  Politikası. İBUMED'e özel, KVKK referanslı içerik; footer'dan ve çerez
  banner'ından bağlantı veriliyor. Sayfa altında bu metinlerin bilgilendirme
  amaçlı olduğu, hukuki tavsiye yerine geçmediği belirtiliyor.
- **51 arşiv yazısı**, tüm kurumsal sayfalar (Hakkımızda, Yönetim Kurulu,
  Üyelik, Ön Başvuru, Anlaşmalı Kurumlar, İletişim), 49 fotoğraflık albüm ve
  tüm PDF belgeleri eksiksiz taşındı.
- **Gerçek üniversite fotoğrafları** — anasayfadaki "Köklerimiz" bölümünde
  AİBÜ'nün resmi/üçüncü parti kaynaklardan fotoğrafları kullanılıyor
  (harici bağlantı/hotlink; aşağıdaki notu okuyun).

## Dosya yapısı

```
index.html, blog.html, yazi.html, hakkimizda.html, yonetim.html,
uyelik.html, on-basvuru.html, kurumlar.html, iletisim.html, galeri.html

css/style.css         Tüm site tasarımı
js/data.js             51 arşiv yazısının verisi — Blog Yayıncısı bu dosyaya yazar
js/gallery-data.js     Albüm fotoğraf verisi
js/i18n.js              TR/EN çeviri sözlüğü ve motoru
js/consent.js            Çerez onay sistemi (banner + ayarlar modalı)
js/components.js       Menü/footer/logo bileşenleri
js/app.js                Yardımcı fonksiyonlar (tarih biçimi, kart şablonları)

gizlilik-politikasi.html, kullanim-sartlari.html, cerez-politikasi.html
                          Hukuki sayfalar (çift dilli)

assets/images/         Tüm görseller
assets/docs/            PDF belgeleri
```

## ⚠️ Harici (hotlink) üniversite fotoğrafları hakkında

Anasayfadaki "Köklerimiz" bölümündeki iki fotoğraf, doğrudan kaynak
sitelerine (ibu.edu.tr ve univerlist.com) bağlanıyor — dosyalar bu pakete
**gömülü değil**. Bunun nedeni, bu görselleri sizin verdiğiniz bağlantılardan
indirip yerel olarak paketleyecek bir araca şu an sahip olmamamdı. Pratik
sonucu:

- Kaynak siteler görseli kaldırır/taşırsa ya da hotlinking'i engellerse, bu
  fotoğraflar sitenizde görünmez olur.
- **Öneri:** Bu iki görseli indirip `assets/images/` klasörüne koyun (ör.
  `assets/images/kampus-1.jpg`), sonra `index.html` içindeki ilgili
  `<img src="https://...">` satırlarını `assets/images/kampus-1.jpg` gibi
  yerel bir yola çevirin. İsterseniz bu değişikliği sizin için yaparım —
  yeter ki görselleri bana iletin ya da doğrudan repoya ekleyin.
- Kullanıcının verdiği bir üçüncü fotoğraf (Facebook CDN bağlantısı) hiç
  kullanılmadı, çünkü o bağlantı süreli/imzalı bir URL taşıyor ve kısa süre
  içinde otomatik olarak geçersiz hale geliyor.

## Yayına alma

Herhangi bir statik barındırma hizmetinde çalışır: GitHub Pages, Netlify,
Vercel, Cloudflare Pages ya da normal bir paylaşımlı hosting. Bu klasörün
içeriğini sunucunuzun kök dizinine yükleyin. Derleme adımı gerekmez.

---

# İBUMED Blog Yayıncısı — ayrı bir araç

Blog Yayıncısı artık **bu sitenin bir parçası değil**. Ayrı, bağımsız bir
dosya olarak teslim edildi: **`ibumed-blog-yayinlayici.html`**.

## Neden ayrı?

Önceki sürümde yayıncı panel siteye gömülüydü ve yazılar yalnızca
tarayıcınızın yerel deposunda (localStorage) saklanıyordu — yani
yayınladığınız bir yazıyı yalnızca siz, yalnızca o tarayıcıda görebiliyordunuz.
Şimdi bu araç:

1. **Bağımsız bir HTML dosyası** — bilgisayarınızda saklayıp çift tıklayarak
   açabilirsiniz, herhangi bir sunucuya veya siteye bağlı değildir.
2. **GitHub'a doğrudan bağlanır** — bir GitHub Personal Access Token ile
   kimlik doğrulayıp, sitenizin deposundaki `js/data.js` dosyasını okur,
   düzenler ve doğrudan commit atar. Böylece yayınladığınız bir yazı,
   siteniz nerede barındırılıyorsa (GitHub Pages, Netlify, Vercel vb.)
   otomatik deploy sayesinde birkaç dakika içinde **herkese** görünür hale
   gelir — artık yalnızca sizin tarayıcınızda değil.

## Nasıl kullanılır

1. `ibumed-blog-yayinlayici.html` dosyasını bilgisayarınızda bir yere
   kaydedin, çift tıklayıp tarayıcıda açın (internet bağlantısı gereklidir).
2. **GitHub Bağlantısı** panelinden:
   - **Personal Access Token**: [github.com/settings/tokens](https://github.com/settings/tokens?type=beta)
     adresinden "Fine-grained token" oluşturun, yalnızca İBUMED reponuza
     **Contents: Read and write** izni verin.
   - **Repo Sahibi / Repo Adı**: ör. `hsnclk` / `ibumed-site`
   - **Branch**: genelde `main`
   - **Dosya Yolu**: `js/data.js` (site bu isimle bekliyor, değiştirmeyin)
3. **"Bağlan & Yazıları Getir"** — mevcut tüm yazılarınız solda listelenir.
4. Bir yazıya tıklayıp düzenleyin, ya da **"+ Yeni Yazı"** ile yenisini
   oluşturun. Başlık, tarih, kategori, etiket, özet, kapak görseli (repodaki
   bir yol ya da tam URL) ve Markdown destekli içerik girilir; sağda canlı
   önizleme anında güncellenir.
5. **"💾 GitHub'a Kaydet"** — yazı doğrudan reponuza commit edilir. Barındırma
   servisiniz otomatik deploy yapıyorsa, değişiklik birkaç dakika içinde
   canlı sitede görünür.
6. Bir yazıyı düzenlerken **"Sil"** ile GitHub'dan kaldırabilirsiniz.

### 🌐 İngilizce içerik / AI destekli çeviri (Gemini)

Her yazının editöründe isteğe bağlı bir "🌐 İngilizce İçerik" paneli var:

- Başlık, özet ve içeriğin İngilizcesini elle yazabilirsiniz, **veya**
- Panelin altındaki **⚙️ Gemini Ayarları**'ndan ücretsiz bir Gemini API
  anahtarı girip **"🤖 AI ile Otomatik Doldur"** ile Türkçe içeriği tek
  tıkla İngilizceye çevirebilirsiniz (anahtar yalnızca bu tarayıcıda
  saklanır, doğrudan Google'a gönderilir — [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
  adresinden ücretsiz alınır), **veya**
- **"📄 JSON Çıktı Al"** ile yazıyı kopyalayıp herhangi bir AI'ya (ChatGPT,
  Claude, Gemini) verip çevirisini **"📥 JSON İçe Aktar"** ile geri
  yükleyebilirsiniz.

Bir yazının İngilizcesi girilmemişse, sitenin İngilizce görünümünde o yazı
Türkçe orijinaliyle (uyarı notuyla) gösterilir — hiçbir içerik kaybolmaz.

### ⚠️ Önemli notlar

- Token'ınızı yalnızca güvendiğiniz bir bilgisayarda girin; token bu
  dosyanın çalıştığı tarayıcının localStorage'ında saklanır.
- Kapak görseli alanı artık bir **URL/yol** ister (önceki sürümdeki gibi
  bilgisayardan doğrudan yükleme yoktur) — bunun nedeni, görselleri
  base64 olarak `data.js` içine gömmenin dosyayı çok büyütmesi ve git
  geçmişini şişirmesidir. Yeni bir kapak görseli kullanmak isterseniz,
  önce görseli `assets/images/posts/` klasörüne GitHub üzerinden
  (web arayüzünden ya da git ile) yükleyin, sonra o yolu buraya yazın.
- Bu araç yalnızca `js/data.js` dosyasını günceller; site tasarımını,
  sayfalarını ya da diğer dosyaları değiştirmez.
