// =============================================================================
// İBUMED — paylaşılan bileşenler: üst menü, alt bilgi, mühür/rozet SVG'si,
// dalga ayırıcı. Her sayfa <div id="site-header"> ve <div id="site-footer">
// içine bu bileşenleri enjekte eder; böylece menü tek yerden yönetilir.
// =============================================================================

const IBUMED_NAV = [
  { href: "index.html", label: "Anasayfa", key: "home" },
  { href: "blog.html", label: "Blog", key: "blog" },
  { href: "galeri.html", label: "Albüm", key: "gallery" },
  { href: "yonetim.html", label: "Yönetim", key: "board" },
  { href: "uyelik.html", label: "Üyelik", key: "membership" },
  { href: "hakkimizda.html", label: "Hakkımızda", key: "about" },
  { href: "iletisim.html", label: "İletişim", key: "contact" },
];

// Gerçek İBUMED logosu (ağaç amblemi + yazı) — nav ve footer'da kullanılır
function ibumedLogoImg(extraClass = "") {
  return `<img src="assets/images/ibumed_logo.png" alt="İBUMED — AİBÜ Mezunları Derneği" class="brand-logo-img ${extraClass}">`;
}

// Anasayfa hero görseli: gerçek logo, dönen dekoratif bir mühür halkasının içinde
function ibumedHeroEmblem() {
  return `
  <div class="hero-emblem">
    <svg class="hero-emblem-ring" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="47" stroke="currentColor" stroke-width="0.7" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1.2 3.2" />
      <path id="heroRingText" d="M 50 9 A 41 41 0 1 1 49.9 9" fill="none" />
      <text font-family="IBM Plex Mono, monospace" font-size="4.6" letter-spacing="2.6" fill="currentColor">
        <textPath href="#heroRingText" startOffset="1%">KURULUŞ 2010 · BOLU · İSTANBUL · İBUMED ·</textPath>
      </text>
    </svg>
    <img src="assets/images/ibumed_logo.png" alt="İBUMED — AİBÜ Mezunları Derneği" class="hero-emblem-logo">
  </div>`;
}

function rippleDividerSVG() {
  return `
  <svg class="ripple-divider" viewBox="0 0 1200 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 20 Q 50 4 100 20 T 200 20 T 300 20 T 400 20 T 500 20 T 600 20 T 700 20 T 800 20 T 900 20 T 1000 20 T 1100 20 T 1200 20" />
    <path d="M0 26 Q 50 12 100 26 T 200 26 T 300 26 T 400 26 T 500 26 T 600 26 T 700 26 T 800 26 T 900 26 T 1000 26 T 1100 26 T 1200 26" />
    <path d="M0 32 Q 50 22 100 32 T 200 32 T 300 32 T 400 32 T 500 32 T 600 32 T 700 32 T 800 32 T 900 32 T 1000 32 T 1100 32 T 1200 32" />
  </svg>`;
}

function renderHeader(activeKey) {
  const el = document.getElementById("site-header");
  if (!el) return;
  el.innerHTML = `
  <header class="site-header">
    <div class="wrap nav">
      <a href="index.html" class="brand">
        ${ibumedLogoImg()}
      </a>
      <nav class="nav-links">
        ${IBUMED_NAV.map(n => `<a href="${n.href}" class="${n.key === activeKey ? "active" : ""}" data-i18n="nav.${n.key}">${n.label}</a>`).join("")}
      </nav>
      <div class="nav-cta">
        <div class="lang-switch" id="langSwitch">
          <button class="lang-btn" data-lang="tr">TR</button>
          <button class="lang-btn" data-lang="en">EN</button>
        </div>
        <a href="on-basvuru.html" class="btn btn-primary btn-sm" data-i18n="nav.preapp">Ön Başvuru</a>
        <button class="menu-toggle" id="menuToggle" aria-label="Menüyü aç"><span></span></button>
      </div>
    </div>
  </header>
  <div class="mobile-drawer" id="mobileDrawer">
    <button class="mobile-drawer-close" id="drawerClose">✕</button>
    <div class="lang-switch lang-switch-mobile" id="langSwitchMobile">
      <button class="lang-btn" data-lang="tr">Türkçe</button>
      <button class="lang-btn" data-lang="en">English</button>
    </div>
    ${IBUMED_NAV.map(n => `<a href="${n.href}" data-i18n="nav.${n.key}">${n.label}</a>`).join("")}
    <a href="on-basvuru.html" data-i18n="nav.preapp">Ön Başvuru</a>
  </div>`;

  const toggle = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileDrawer");
  const close = document.getElementById("drawerClose");
  if (toggle && drawer) {
    toggle.addEventListener("click", () => drawer.classList.add("open"));
    close.addEventListener("click", () => drawer.classList.remove("open"));
    drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", () => drawer.classList.remove("open")));
  }
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
  });
  applyI18n();
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  const year = new Date().getFullYear();
  el.innerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <div class="footer-brand">
            ${ibumedLogoImg("footer-logo-img")}
          </div>
          <p class="footer-desc" data-i18n="footer.desc">Abant İzzet Baysal Üniversitesi Mezunları Derneği — 2010'dan bu yana mezunları, öğrencileri ve üniversiteyi aynı çatı altında buluşturuyor.</p>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footer.corporate">Kurumsal</h5>
          <a href="hakkimizda.html" data-i18n="footer.about">Hakkımızda</a>
          <a href="yonetim.html" data-i18n="footer.board">Yönetim Kurulu</a>
          <a href="kurumlar.html" data-i18n="footer.partners">Anlaşmalı Kurumlar</a>
          <a href="galeri.html" data-i18n="footer.gallery">Albüm</a>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footer.join">Katıl</h5>
          <a href="uyelik.html" data-i18n="footer.membership">Üyelik</a>
          <a href="on-basvuru.html" data-i18n="footer.preapp">Ön Başvuru</a>
          <a href="bagis-yap.html" data-i18n="footer.donate">Bağış Yap</a>
          <a href="blog.html" data-i18n="footer.blog">Blog</a>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footer.contact">İletişim</h5>
          <p>ibumed [at] ibu.edu.tr</p>
          <p data-i18n="footer.branches">Bolu · İstanbul</p>
          <a href="iletisim.html" data-i18n="footer.contactform">İletişim Formu →</a>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footer.legal">Yasal</h5>
          <a href="gizlilik-politikasi.html" data-i18n="footer.privacy">Gizlilik Politikası</a>
          <a href="kullanim-sartlari.html" data-i18n="footer.terms">Kullanım Şartları</a>
          <a href="cerez-politikasi.html" data-i18n="footer.cookiepolicy">Çerez Politikası</a>
          <a href="#" id="footerCookieSettingsBtn" data-i18n="footer.cookiesettings">Çerez Ayarları</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${year} İBUMED — <span data-i18n="footer.rights">Tüm hakları saklıdır.</span></span>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/i̇bumed/posts/?feedView=all" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>
          <a href="https://twitter.com/ibumed" target="_blank" rel="noopener" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.6.8-2.6 1-.7-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.9-4.1 4.1 0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.3-.4.6-.6 1.3-.6 2.1 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2.1 2.8 3.9 2.8-1.4 1.1-3.2 1.8-5.2 1.8-.3 0-.7 0-1-.1 1.9 1.2 4.1 1.9 6.5 1.9 7.8 0 12-6.4 12-12v-.5c.8-.6 1.5-1.3 2.1-2.1z"/></svg></a>
          <a href="https://www.instagram.com/ibumedofficial" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1"/></svg></a>
          <a href="https://www.facebook.com/groups/ibumed" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5H16.5V4.2C16.2 4.1 15.2 4 14 4c-2.4 0-4 1.5-4 4.1v2.4H7.5v3H10V21h3.5z"/></svg></a>
        </div>
      </div>
    </div>
  </footer>
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" id="lightboxClose">✕</button>
    <img src="" alt="" id="lightboxImg" />
    <div class="lightbox-cap" id="lightboxCap"></div>
  </div>`;

  const lb = document.getElementById("lightbox");
  const lbClose = document.getElementById("lightboxClose");
  if (lb && lbClose) {
    lbClose.addEventListener("click", () => lb.classList.remove("open"));
    lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });
  }
  const cookieBtn = document.getElementById("footerCookieSettingsBtn");
  if (cookieBtn) {
    cookieBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof openCookieSettingsModal === "function") openCookieSettingsModal();
    });
  }
  applyI18n();
}

function openLightbox(src, caption) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCap");
  if (!lb) return;
  img.src = src;
  img.alt = caption || "";
  cap.textContent = caption || "";
  lb.classList.add("open");
}

// Scroll-reveal for elements with .reveal
function initReveal() {
  const items = document.querySelectorAll(".reveal:not(.in)");
  if (items.length === 0) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(i => i.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  items.forEach(i => io.observe(i));

  // Güvenlik ağı: herhangi bir sebeple (görüntü yakalama araçları, eski
  // tarayıcılar, sekme arka planda vb.) intersection observer tetiklenmezse
  // içerik kalıcı olarak görünmez kalmasın diye kısa süre sonra zorla göster.
  window.setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in)").forEach(el => el.classList.add("in"));
  }, 1200);
}

document.addEventListener("DOMContentLoaded", initReveal);
