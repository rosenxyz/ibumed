// =============================================================================
// İBUMED — Güncel Yönetim Kurulu verisi (TEK kaynak).
// Hem yonetim.html (tam liste) hem index.html (özet kartlar) buradan okur —
// böylece bir üyenin fotoğrafı/rolü/linki güncellendiğinde iki sayfa da
// otomatik senkron kalır, elle kopyalanan veriler birbirinden sapmaz.
// =============================================================================
const IBUMED_BOARD = [
  { name: "Nihal Öğten", roleTr: "Başkan", photo: "assets/images/board/nihal-ogten.jpg",
    links: [{ label: "X", url: "https://x.com/smmmnihal" }, { label: "LinkedIn", url: "https://tr.linkedin.com/in/nihal-öğten-71435536" }] },
  { name: "Cevher Altuğ", roleTr: "Başkan Yardımcısı", photo: "assets/images/board/cevher-altug.jpg",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/cevher-altug-a8a5ba37/" }] },
  { name: "Nuriye Özengin", roleTr: "Başkan Yardımcısı", photo: "assets/images/board/nuriye-ozengin.jpg",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/nuriye-%C3%B6zengin-b8b086260/" }] },
  { name: "Pınar Özayan", roleTr: "Sayman", photo: "assets/images/board/pinar-ozayan.jpg",
    links: [{ label: "LinkedIn", url: "https://tr.linkedin.com/in/pınar-özayan-685688110" }] },
  { name: "Cem Kösemeci", roleTr: "Genel Sekreter", photo: "assets/images/board/cem-kosemeci.jpg",
    links: [{ label: "LinkedIn", url: "https://tr.linkedin.com/in/cemkosemeci" }] },
  { name: "İlkay Bağatır", roleTr: "YK Üyesi", photo: "assets/images/board/ilkay-bagatir.jpg",
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/ilkay-bağatır-90a5b839/" }, { label: "İzzet Baysal Vakfı", url: "https://izzetbaysalvakfi.org.tr/izzet-baysal-vakfi/mutevelliler-ve-yonetim/yonetim-kurulu-uyeleri/ilkay-bagatir" }] },
  { name: "Bahar Akbulak", roleTr: "YK Üyesi", photo: "assets/images/board/bahar-akbulak.jpg",
    links: [{ label: "Academia.edu", url: "https://ibu.academia.edu/BaharAKBULAK" }, { label: "YÖK Akademik", url: "https://akademik.yok.gov.tr/AkademikArama/view/viewAuthor.jsp" }] },
];
