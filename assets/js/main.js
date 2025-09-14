const translations = {
  ja: {
    appName: "灰色の世界",
    tagline: "色が戻る瞑想アプリ",
    heroLead: "呼吸に合わせて、画面に色が広がる。タップでリズムをつかみ、心と画面が少しずつ彩られていく体験を。",
    cta: "App Storeで見る",
    feat1t: "色が満ちる演出",
    feat1d: "正しいリズムでタップできるほど、グレーの世界に色が戻る直感的なフィードバック。",
    feat2t: "呼吸ガイド",
    feat2d: "4-7-8 / ボックス呼吸 / 5-5 など、定番のテンポを選べます。",
    feat3t: "背景ギャラリー",
    feat3d: "季節の絶景や幻想アートを収録。広告視聴や購入で順次解放も。",
    galleryTitle: "スクリーンショット",
    faqTitle: "よくある質問",
    faq1q: "対応OSは？",
    faq1a: "iOS 17 以降を推奨しています。",
    faq2q: "課金や広告は？",
    faq2a: "一部コンテンツは無料で楽しめます。追加背景の解放は広告視聴や購入を検討中です。",
    faq3q: "プライバシーは？",
    faq3a: "追跡を行わない方針です。詳細はプライバシーポリシーをご確認ください。",
    policies: "プライバシー",
    support: "サポート",
    ads: "app-ads.txt",
    copyright: "© {year} 灰色の世界 / Gray World"
  },
  en: {
    appName: "Gray World",
    tagline: "A meditation where color returns",
    heroLead: "As you breathe, color spreads across the screen. Tap in rhythm to restore hues to a grayscale world—calming, tangible feedback.",
    cta: "View on the App Store",
    feat1t: "Color Bloom Feedback",
    feat1d: "Stay on rhythm and watch grayscale scenes regain color—simple, satisfying progression.",
    feat2t: "Breath Modes",
    feat2d: "4-7-8, box breathing, calm 5-5, and more—pick the tempo that suits you.",
    feat3t: "Background Gallery",
    feat3d: "Seasonal vistas and dreamy art. Unlock progressively via rewarded views or purchase.",
    galleryTitle: "Screenshots",
    faqTitle: "FAQ",
    faq1q: "Supported OS?",
    faq1a: "We recommend iOS 17 or later.",
    faq2q: "Pricing & ads?",
    faq2a: "Core features are free. Additional backgrounds may unlock via rewarded views or purchase.",
    faq3q: "Privacy?",
    faq3a: "We do not track you. See the privacy policy for details.",
    policies: "Privacy",
    support: "Support",
    ads: "app-ads.txt",
    copyright: "© {year} Gray World"
  }
};

// ★言語に応じて aタグのhrefを切り替える
function updateLangLinks(lang){
  document.querySelectorAll(".i18n-href").forEach(a=>{
    const url = (lang === "ja") ? a.dataset.hrefJa : a.dataset.hrefEn;
    if (url) a.setAttribute("href", url);
  });
}

function setLang(lang){
  const t = translations[lang];
  if(!t) return;

  // テキストの置換
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const raw = t[key] || el.textContent;
    const year = new Date().getFullYear();
    el.textContent = raw.replace("{year}", year);
  });

  // トグルの見た目 / <html lang> / 保存
  document.querySelectorAll(".lang-toggle button").forEach(btn=>btn.classList.remove("active"));
  const btn = document.querySelector(`.lang-toggle button[data-lang='${lang}']`);
  if(btn) btn.classList.add("active");
  document.documentElement.setAttribute("lang", lang === "ja" ? "ja" : "en");
  localStorage.setItem("gw_lang", lang);

  // ★リンクのhrefも更新
  updateLangLinks(lang);
}

document.addEventListener("DOMContentLoaded", ()=>{
  const saved = localStorage.getItem("gw_lang");
  const init = saved ? saved : ((navigator.language || "").startsWith("ja") ? "ja" : "en");
  setLang(init);

  document.querySelectorAll(".lang-toggle button").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.getAttribute("data-lang")));
  });
});
