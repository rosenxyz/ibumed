// =============================================================================
// İBUMED — ortak yardımcı fonksiyonlar: yazı biçimlendirme, kart şablonları.
// Tüm içerik js/data.js dosyasındaki statik arşivden gelir (bkz. o dosyanın
// başındaki not: yayınlama artık ayrı bir GitHub-bağlantılı araçla yapılır).
// =============================================================================

const TR_MONTHS = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];

const ICONS = {
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"/><path d="M6 3h8l5 5v13H6z"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.5-1.5"/></svg>`,
};

function turkishDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const lang = (typeof getLang === "function") ? getLang() : "tr";
  if (lang === "en") {
    const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return `${EN_MONTHS[m - 1]} ${d}, ${y}`;
  }
  return `${d} ${TR_MONTHS[m - 1]} ${y}`;
}

// Bir yazının verilen dildeki alanını döndürür (yoksa Türkçe orijinaline döner).
// field: "title" | "excerpt" | "body_html" | "body_md"
function getLocalizedField(post, field) {
  const lang = (typeof getLang === "function") ? getLang() : "tr";
  if (lang === "en" && post[field + "_en"] && post[field + "_en"].trim()) {
    return post[field + "_en"];
  }
  return post[field] || "";
}

function hasEnglishTranslation(post) {
  return !!(post.title_en && post.title_en.trim());
}

function slugify(str) {
  const map = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", Ç: "c", Ğ: "g", İ: "i", Ö: "o", Ş: "s", Ü: "u" };
  return str
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, c => map[c] || c)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Tüm yazılar: tamamı js/data.js içindeki statik arşivden gelir. Yeni yazı
// yayınlamak/güncellemek için İBUMED Blog Yayıncısı (ayrı, bağımsız bir HTML
// dosyası) kullanılır — o araç GitHub üzerinden doğrudan bu data.js dosyasına
// commit atar. Site tarafında ekstra bir depolama katmanına gerek yoktur.
// Bugünün tarihini (YYYY-MM-DD, yerel saat dilimine göre) döndürür — yazı
// tarihleriyle basit metin karşılaştırması yapılabilmesi için.
function todayDateString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// İleri tarihli (henüz gelmemiş) yazılar otomatik olarak "zamanlanmış" kabul
// edilir: o tarih gelene kadar hiçbir listede görünmez ve doğrudan linkle de
// açılamaz. Blog Yayıncısı'nda yazı tarihini ileri bir güne ayarlamak,
// başka bir işlem gerekmeden bu davranışı tetikler.
function getAllPosts() {
  const today = todayDateString();
  const merged = IBUMED_STATIC_POSTS.filter(p => p.date <= today);
  merged.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return merged;
}

// Slug ile tek bir yazıyı bulur — zamanlanmış (ileri tarihli) bir yazının
// linki bilinse bile, tarihi gelene kadar bulunamaz (getAllPosts() ile aynı
// görünürlük kuralına tabidir).
function getPostBySlug(slug) {
  return getAllPosts().find(p => p.slug === slug) || null;
}

// Anasayfada gösterilecek yazıları seçer. Bir yazı 1-4 arası bir "pinOrder"
// değeriyle belirli bir konuma sabitlenebilir: 1 = üstteki büyük öne çıkan
// yazı, 2/3/4 = alttaki üçlünün sırasıyla sol/orta/sağ kartı. Sabitlenmemiş
// slotlar, en güncel sabitlenmemiş yazılarla (tarih sırasına göre) doldurulur.
function getHomePosts(max = 4) {
  const all = getAllPosts();
  const slots = new Array(max).fill(null);
  const used = new Set();
  all.forEach(p => {
    const pos = p.pinOrder;
    if (pos >= 1 && pos <= max && !slots[pos - 1]) {
      slots[pos - 1] = p;
      used.add(p.slug);
    }
  });
  const rest = all.filter(p => !used.has(p.slug));
  let ri = 0;
  for (let i = 0; i < max; i++) {
    if (!slots[i]) slots[i] = rest[ri++] || null;
  }
  return slots.filter(Boolean);
}

function categoryLabel(cat) {
  const lang = (typeof getLang === "function") ? getLang() : "tr";
  if (lang === "en") return cat === "media" ? "In the Press" : "Association News";
  return cat === "media" ? "Basında Biz" : "Dernek Haberleri";
}

function postCardHTML(post) {
  const img = post.image || "assets/images/hero_anasayfa.jpeg";
  const title = getLocalizedField(post, "title");
  const excerpt = getLocalizedField(post, "excerpt");
  return `
  <a href="yazi.html?slug=${encodeURIComponent(post.slug)}" class="post-card reveal">
    <div class="post-thumb">
      <img src="${img}" alt="${escapeHTML(title)}" loading="lazy">
      <span class="post-chip">${categoryLabel(post.category)}</span>
    </div>
    <div class="post-body">
      <span class="post-date">${turkishDate(post.date)} · ${post.readingTime || 2} ${t("post.reading")}</span>
      <h3>${escapeHTML(title)}</h3>
      <p class="post-excerpt">${escapeHTML(excerpt)}</p>
      <span class="post-more">${t("post.more")} ${ICONS.arrow}</span>
    </div>
  </a>`;
}

function featuredPostHTML(post) {
  const img = post.image || "assets/images/hero_anasayfa.jpeg";
  const title = getLocalizedField(post, "title");
  const excerpt = getLocalizedField(post, "excerpt");
  return `
  <a href="yazi.html?slug=${encodeURIComponent(post.slug)}" class="post-featured reveal">
    <div class="post-thumb"><img src="${img}" alt="${escapeHTML(title)}"></div>
    <div class="post-featured-body">
      <span class="post-date">${turkishDate(post.date)} · ${t("post.featured")}</span>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(excerpt)}</p>
      <span class="post-more" style="color:#fff">${t("post.more")} ${ICONS.arrow}</span>
    </div>
  </a>`;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

// -----------------------------------------------------------------------
// Basit, bağımlılıksız Markdown → HTML dönüştürücü. Arşiv yazıları zaten
// HTML olarak geliyor (data.js); bu yalnızca body_md alanı olan yazılar için
// (ör. Blog Yayıncısı ile eklenmiş yeni gönderiler) kullanılır.
// -----------------------------------------------------------------------
function mdToHtml(md) {
  if (!md) return "";
  let src = md.replace(/\r\n/g, "\n").trim();

  // Kod bloklarını ve satır içi kodu koru (basit)
  src = src.replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`);

  const lines = src.split("\n");
  let html = "";
  let inList = null; // 'ul' | 'ol'
  let paraBuf = [];

  function flushPara() {
    if (paraBuf.length) {
      html += `<p>${inlineMd(paraBuf.join(" "))}</p>\n`;
      paraBuf = [];
    }
  }
  function closeList() {
    if (inList) { html += `</${inList}>\n`; inList = null; }
  }
  function inlineMd(t) {
    t = t
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return t;
  }

  for (let raw of lines) {
    const line = raw.trim();
    if (line === "") { flushPara(); closeList(); continue; }
    if (/^###\s+/.test(line)) { flushPara(); closeList(); html += `<h3>${inlineMd(line.replace(/^###\s+/, ""))}</h3>\n`; continue; }
    if (/^##\s+/.test(line)) { flushPara(); closeList(); html += `<h2>${inlineMd(line.replace(/^##\s+/, ""))}</h2>\n`; continue; }
    if (/^#\s+/.test(line)) { flushPara(); closeList(); html += `<h2>${inlineMd(line.replace(/^#\s+/, ""))}</h2>\n`; continue; }
    if (/^---+$/.test(line)) { flushPara(); closeList(); html += `<hr>\n`; continue; }
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      if (inList !== "ul") { closeList(); html += "<ul>\n"; inList = "ul"; }
      html += `<li>${inlineMd(line.replace(/^[-*]\s+/, ""))}</li>\n`;
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      if (inList !== "ol") { closeList(); html += "<ol>\n"; inList = "ol"; }
      html += `<li>${inlineMd(line.replace(/^\d+\.\s+/, ""))}</li>\n`;
      continue;
    }
    if (/^>\s?/.test(line)) {
      flushPara(); closeList();
      html += `<blockquote><p>${inlineMd(line.replace(/^>\s?/, ""))}</p></blockquote>\n`;
      continue;
    }
    if (/^</.test(line)) {
      // Ham HTML bloğu (galeri <div>, <iframe> embed vb.) — <p> içine
      // sarmalamadan olduğu gibi geçir.
      flushPara(); closeList();
      html += line + "\n";
      continue;
    }
    paraBuf.push(line);
  }
  flushPara();
  closeList();
  return html;
}

function animateCount(el, target, duration = 1400, suffix = "") {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target).toLocaleString("tr-TR") + (p >= 1 ? suffix : "");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
