// =============================================================================
// İBUMED — Çerez izni yönetimi (KVKK/GDPR uyumlu basit bir uygulama).
// Gerçek bir izin mekanizması: kullanıcı hangi kategorileri onaylarsa
// yalnızca onlar "true" olarak saklanır; sitenin geri kalanı (ya da ileride
// eklenecek analytics/reklam script'leri) hasConsent() ile bu tercihi
// kontrol edip ona göre yüklenmelidir. Şu an sitede analytics/reklam
// script'i YOKTUR — bu altyapı ileride eklenecekler için hazırlanmıştır.
// =============================================================================

const COOKIE_CONSENT_KEY = "ibumed_cookie_consent_v1";

function getConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveConsent(partial) {
  const previous = getConsent();
  const consent = {
    necessary: true, // her zaman zorunlu, kapatılamaz
    analytics: !!partial.analytics,
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

  // Daha önce açık olan bir kategori şimdi kapatıldıysa (kullanıcı iznini geri
  // çektiyse), o kategoriye ait olası bir betiğin (ör. zaten yüklenmiş bir
  // analytics script'i) belleğe alınmış çalışmasını kesin olarak durdurmanın
  // tek güvenilir yolu sayfayı yenilemektir — statik bir sitede "script'i
  // çalışırken durdur" garantisi veremeyiz, ama "bir daha hiç çalışmasın"
  // garantisini sayfa yenileme + hasConsent() kontrolüyle sağlarız.
  const downgraded = previous && previous.analytics && !consent.analytics;
  if (downgraded) {
    setTimeout(() => window.location.reload(), 300);
  }
  return consent;
}

// Diğer scriptler (ör. ileride eklenecek bir analytics/reklam kodu) bunu
// çağırarak ilgili kategoriye izin verilip verilmediğini kontrol etmelidir:
//   if (hasConsent("analytics")) { /* analytics script'ini yükle */ }
//
// ÖNEMLİ — gerçek bir "reddedilirse hiç veri toplanmasın" garantisi için:
// Google Analytics gibi bir betik eklerken script TAG'İNİ SAYFAYA HİÇ
// KOYMAYIN; bunun yerine aşağıdaki gibi koşullu olarak enjekte edin, böylece
// kullanıcı reddettiğinde kod hiç çalışmaz, arka planda "sessizce" de
// yüklenmez:
//
//   document.addEventListener("DOMContentLoaded", () => {
//     if (hasConsent("analytics")) loadGoogleAnalytics();
//   });
//   function loadGoogleAnalytics(){
//     const s = document.createElement("script");
//     s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
//     s.async = true;
//     document.head.appendChild(s);
//     window.dataLayer = window.dataLayer || [];
//     function gtag(){ dataLayer.push(arguments); }
//     gtag("js", new Date());
//     gtag("config", "G-XXXXXXX", { anonymize_ip: true });
//   }
//
// Kullanıcı DAHA SONRA tercihini "kabul"den "ret"e çevirirse (Çerez
// Ayarları'ndan), zaten yüklenmiş bir analytics scripti varsa onu tam olarak
// durdurmanın en güvenilir yolu sayfayı yeniden yüklemektir — bu yüzden
// saveConsent() çağrısından sonra tercih "analytics" için false'a
// düştüyse sayfa otomatik olarak yenilenir (aşağıya bakın).
function hasConsent(category) {
  if (category === "necessary") return true;
  const c = getConsent();
  return !!(c && c[category]);
}

function renderCookieConsent() {
  const el = document.getElementById("cookie-consent-root");
  if (!el) return;

  el.innerHTML = `
  <div class="cookie-banner" id="cookieBanner">
    <div class="cookie-banner-inner">
      <div class="cookie-banner-text">
        <h4 data-i18n="cookie.banner.title">Çerez Kullanımı</h4>
        <p>
          <span data-i18n="cookie.banner.desc">Web sitemizde size en iyi deneyimi sunabilmek için çerezler kullanıyoruz. Çerezler, site işlevselliğini sağlar ve trafik analizi yapar.</span>
          <a href="gizlilik-politikasi.html" data-i18n="cookie.banner.privacy">Gizlilik Politikamızı</a>,
          <a href="kullanim-sartlari.html" data-i18n="cookie.banner.terms">Kullanım Şartlarımızı</a> ve
          <a href="cerez-politikasi.html" data-i18n="cookie.banner.cookies">Çerez Politikamızı</a>
          <span data-i18n="cookie.banner.review"> inceleyebilirsiniz.</span>
        </p>
      </div>
      <div class="cookie-banner-actions">
        <button class="btn btn-primary btn-sm" id="cookieAcceptAll" data-i18n="cookie.banner.acceptall">Tümünü Kabul Et</button>
        <button class="btn btn-ghost btn-sm" id="cookieNecessaryOnly" data-i18n="cookie.banner.necessaryonly">Sadece Gerekli</button>
        <button class="cookie-settings-link" id="cookieOpenSettings" data-i18n="cookie.banner.settings">Çerez Ayarları</button>
      </div>
    </div>
  </div>

  <div class="modal-overlay" id="cookieSettingsModal">
    <div class="modal-box cookie-modal">
      <div class="cookie-modal-head">
        <h3 data-i18n="cookie.modal.title">Çerez Ayarları</h3>
        <button class="cookie-modal-close" id="cookieModalClose" aria-label="Kapat">✕</button>
      </div>
      <p class="cookie-modal-desc" data-i18n="cookie.modal.desc">Tercihlerinizi aşağıdan özelleştirebilirsiniz. Gerekli çerezler, sitenin temel işlevselliği için zorunludur ve devre dışı bırakılamaz.</p>
      <p class="cookie-modal-links">
        <a href="gizlilik-politikasi.html" data-i18n="footer.privacy">Gizlilik Politikası</a> ·
        <a href="kullanim-sartlari.html" data-i18n="footer.terms">Kullanım Şartları</a> ·
        <a href="cerez-politikasi.html" data-i18n="footer.cookiepolicy">Çerez Politikası</a>
      </p>

      <div class="cookie-cat">
        <div class="cookie-cat-row">
          <div>
            <h4 data-i18n="cookie.cat.necessary.t">Gerekli Çerezler</h4>
            <p data-i18n="cookie.cat.necessary.d">Bu çerezler web sitesinin temel işlevselliği için gereklidir (ör. dil tercihiniz).</p>
          </div>
          <label class="toggle-switch disabled">
            <input type="checkbox" checked disabled>
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="cookie-cat">
        <div class="cookie-cat-row">
          <div>
            <h4 data-i18n="cookie.cat.analytics.t">Analitik Çerezler</h4>
            <p data-i18n="cookie.cat.analytics.d">Web sitemizin nasıl kullanıldığını anlamamıza yardımcı olur.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="toggleAnalytics">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="cookie-modal-actions">
        <button class="btn btn-ghost btn-sm" id="cookieModalCancel" data-i18n="cookie.modal.cancel">İptal</button>
        <button class="btn btn-primary btn-sm" id="cookieModalSave" data-i18n="cookie.modal.save">Ayarları Kaydet</button>
      </div>
    </div>
  </div>`;

  wireCookieConsentEvents();
  applyI18n();

  const existing = getConsent();
  if (!existing) {
    document.getElementById("cookieBanner").classList.add("show");
  }
}

function wireCookieConsentEvents() {
  const banner = document.getElementById("cookieBanner");
  const modal = document.getElementById("cookieSettingsModal");

  document.getElementById("cookieAcceptAll").addEventListener("click", () => {
    saveConsent({ analytics: true });
    banner.classList.remove("show");
  });
  document.getElementById("cookieNecessaryOnly").addEventListener("click", () => {
    saveConsent({ analytics: false });
    banner.classList.remove("show");
  });
  document.getElementById("cookieOpenSettings").addEventListener("click", () => {
    openCookieSettingsModal();
  });
  document.getElementById("cookieModalClose").addEventListener("click", () => modal.classList.remove("open"));
  document.getElementById("cookieModalCancel").addEventListener("click", () => modal.classList.remove("open"));
  document.getElementById("cookieModalSave").addEventListener("click", () => {
    saveConsent({
      analytics: document.getElementById("toggleAnalytics").checked,
    });
    modal.classList.remove("open");
    banner.classList.remove("show");
  });
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
}

// Footer'daki "Çerez Ayarları" linki de dahil, her yerden çağrılabilir.
function openCookieSettingsModal() {
  const modal = document.getElementById("cookieSettingsModal");
  if (!modal) return;
  const existing = getConsent();
  document.getElementById("toggleAnalytics").checked = existing ? !!existing.analytics : false;
  modal.classList.add("open");
}
