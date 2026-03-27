export type Lang = "tr" | "en";

export interface Translations {
  nav: {
    features: string;
    howItWorks: string;
    leaderboard: string;
    matches: string;
    login: string;
    cta: string;
  };
  hero: {
    tagline: string;
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  matchCard: {
    live: string;
    prediction: string;
    potentialPoints: string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
    f5Title: string;
    f5Desc: string;
    f6Title: string;
    f6Desc: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    s2Desc: string;
    s3Title: string;
    s3Desc: string;
    s4Title: string;
    s4Desc: string;
  };
  scoring: {
    title: string;
    subtitle: string;
    exact: string;
    exactDesc: string;
    winnerDiff: string;
    winnerDiffDesc: string;
    winner: string;
    winnerDesc: string;
    draw: string;
    drawDesc: string;
    close: string;
    closeDesc: string;
    wrong: string;
    wrongDesc: string;
    multiplierNote: string;
  };
  leaderboard: {
    badge: string;
    title: string;
    subtitle: string;
    rank: string;
    player: string;
    points: string;
    accuracy: string;
    viewAll: string;
    thisWeek: string;
    live: string;
    rankingSystem: string;
    multiplierTitle: string;
    derby: string;
    campaign: string;
    deadline: string;
    tierExact: string;
    tierWinnerDiff: string;
    tierWinner: string;
    tierDraw: string;
    tierClose: string;
    tierWrong: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    button: string;
    loginLabel: string;
  };
  theme: {
    title: string;
    teamColor: string;
    teamColorLocked: string;
  };
  register: {
    title: string;
    subtitle: string;
    displayName: string;
    displayNamePlaceholder: string;
    username: string;
    usernamePlaceholder: string;
    usernameHint: string;
    email: string;
    emailPlaceholder: string;
    emailHint: string;
    password: string;
    passwordPlaceholder: string;
    passwordHint: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    submit: string;
    loading: string;
    haveAccount: string;
    login: string;
  };
  footer: {
    tagline: string;
    product: string;
    features: string;
    howItWorks: string;
    leaderboard: string;
    legal: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
    comingSoon: string;
    iosApp: string;
    androidApp: string;
    apiAccess: string;
  };
  matches: {
    badge: string;
    title: string;
    viewAll: string;
    all: string;
    leaguePL: string;
    leagueLaLiga: string;
    leagueTSL: string;
    leagueUCL: string;
    today: string;
    tomorrow: string;
    sunday: string;
    tuesday: string;
    wednesday: string;
    week: string;
    quarterFinal: string;
    derby: string;
  };
}

export const tr: Translations = {
  nav: {
    features: "Özellikler",
    howItWorks: "Nasıl Çalışır?",
    leaderboard: "Sıralama",
    matches: "Maçlar",
    login: "Giriş Yap",
    cta: "Hemen Oyna",
  },
  hero: {
    tagline: "Fantazi Futbol",
    badge: "⚽  Yeni Sezon Başladı",
    line1: "TAHMİN ET",
    line2: "YARIŞ",
    line3: "EFSANE OL",
    subtitle:
      "Futbol maçlarını tahmin et, her doğru skordan puan kazan ve Türkiye'nin en iyi tahmin ustalarıyla rekabete gir.",
    cta: "Hemen Oyna →",
    ctaSecondary: "Nasıl Çalışır?",
    stat1Value: "12.400+",
    stat1Label: "Aktif Oyuncu",
    stat2Value: "890K+",
    stat2Label: "Tahmin",
    stat3Value: "%67",
    stat3Label: "Ort. Başarı",
  },
  matchCard: {
    live: "CANLI",
    prediction: "Tahminim",
    potentialPoints: "Potansiyel Puan",
  },
  features: {
    badge: "Neden byLiGG?",
    title: "Futbol Tahmininin Yeni Adresi",
    subtitle:
      "Sadece maç kazananını değil, tam skoru tahmin et. Ne kadar doğruysan o kadar çok puan.",
    f1Title: "Gerçek Zamanlı Puanlama",
    f1Desc:
      "Maç bittiği anda puanların anında güncellenir. Sıralamadaki yerini canlı takip et.",
    f2Title: "Dünya Ligleri",
    f2Desc:
      "Premier Lig, La Liga, Serie A, Bundesliga, Süper Lig ve daha onlarca lig.",
    f3Title: "Özel Turnuvalar",
    f3Desc:
      "Arkadaşlarınla veya iş arkadaşlarınla kendi özel tahmin ligi. Kendi kuralların, kendi kupan.",
    f4Title: "Detaylı İstatistikler",
    f4Desc: "Tahmin geçmişin, başarı oranın ve performans grafiklerin tek ekranda.",
    f5Title: "Anlık Bildirimler",
    f5Desc: "Maç başlangıçları, puan güncellemeleri ve sıralama değişikliklerinde anında haberdar ol.",
    f6Title: "Derbi Bonusu",
    f6Desc: "Derbi maçlarında 2x, kampanya haftasında 3x puan çarpanı. Risk al, daha çok kazan.",
  },
  howItWorks: {
    badge: "Nasıl Çalışır?",
    title: "Nasıl Çalışır?",
    subtitle: "Dört adımda futbol tahmin platformuna katıl ve oynamaya başla.",
    s1Title: "Hesap Oluştur",
    s1Desc: "E-posta veya sosyal hesabınla saniyeler içinde kayıt ol.",
    s2Title: "Maçı Seç",
    s2Desc: "Oynamak istediğin ligi ve maçı seç. Yüzlerce seçenek seni bekliyor.",
    s3Title: "Tahminini Gir",
    s3Desc: "Tam skor tahminini gir. Cesur ol — tam skor 10 puan!",
    s4Title: "Puan Kazan",
    s4Desc: "Maç bittikten sonra puanlar hesabına eklenir. Sıralamada yüksel.",
  },
  scoring: {
    title: "Puanlama Sistemi",
    subtitle:
      "Her doğru tahmin puan getirir. Ne kadar doğru tahmin yaparsan, o kadar yüksek puan.",
    exact: "Tam Skor",
    exactDesc: "Skoru birebir bildin",
    winnerDiff: "Kazanan + Fark",
    winnerDiffDesc: "Kazananı ve farkı bildin",
    winner: "Sadece Kazanan",
    winnerDesc: "Kazananı bildin",
    draw: "Beraberlik",
    drawDesc: "Beraberliği tahmin ettin",
    close: "1 Golle Kaçırdın",
    closeDesc: "Bir gol eksik/fazla",
    wrong: "Yanlış Tahmin",
    wrongDesc: "Maalesef olmadı",
    multiplierNote: "⚡ Derbi maçlarda puan x2 · Kampanya haftasında x3",
  },
  leaderboard: {
    badge: "Liderlik Tablosu",
    title: "Sıralama",
    subtitle: "Bu haftanın en iyi tahmin ustalarıyla tanış. Sırada sen olabilirsin.",
    rank: "Sıra",
    player: "Oyuncu",
    points: "Puan",
    accuracy: "Başarı",
    viewAll: "Tüm Sıralamayı Gör",
    thisWeek: "Bu Hafta",
    live: "Canlı",
    rankingSystem: "Sıralama Sistemi",
    multiplierTitle: "🔥 Puan Çarpanı",
    derby: "⚡ Derbi maçları",
    campaign: "🚀 Kampanya haftası",
    deadline: "⏰ Tahmin deadline",
    tierExact: "Tam Skor",
    tierWinnerDiff: "Kazanan+Fark",
    tierWinner: "Kazanan",
    tierDraw: "Beraberlik",
    tierClose: "1 Golle Kaçtı",
    tierWrong: "Yanlış",
  },
  cta: {
    badge: "Hemen Oynamaya Başla!",
    title: "Hazır mısın?",
    subtitle: "Ücretsiz hesap oluştur, hemen oynamaya başla. Kredi kartı gerekmez.",
    button: "Ücretsiz Kayıt Ol",
    loginLabel: "Zaten hesabın var mı?",
  },
  theme: {
    title: "Tema",
    teamColor: "Favori Takım",
    teamColorLocked: "Giriş yapınca açılır",
  },
  register: {
    title: "Kayıt Ol",
    subtitle: "Topluluğa katıl, oynamaya başla",
    displayName: "Görünen Ad",
    displayNamePlaceholder: "GamerPro",
    username: "Kullanıcı Adı",
    usernamePlaceholder: "gamer_pro99",
    usernameHint: "Harf, rakam, _ ve . kullanabilirsin",
    email: "E-posta",
    emailPlaceholder: "gamer@domain.com",
    emailHint: "Gizli tutulur, profilinde yer almaz.",
    password: "Şifre",
    passwordPlaceholder: "••••••••",
    passwordHint: "En az 6 karakter, 1 harf ve 1 rakam",
    confirmPassword: "Şifre Tekrar",
    confirmPasswordPlaceholder: "••••••••",
    submit: "Kayıt Ol",
    loading: "Kayıt olunuyor...",
    haveAccount: "Zaten hesabın var mı?",
    login: "Giriş Yap",
  },
  footer: {
    tagline: "Futbol tahmininin en heyecanlı adresi.",
    product: "Ürün",
    features: "Özellikler",
    howItWorks: "Nasıl Çalışır?",
    leaderboard: "Sıralama",
    legal: "Yasal",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Şartları",
    contact: "İletişim",
    copyright: "© 2026 byLiGG. Tüm hakları saklıdır.",
    comingSoon: "Yakında",
    iosApp: "iOS Uygulaması",
    androidApp: "Android Uygulaması",
    apiAccess: "API Erişimi",
  },
  matches: {
    badge: "Bu Hafta Maçları",
    title: "Tahmin Bekleyen Maçlar",
    viewAll: "Tüm Maçları Gör",
    all: "Tümü",
    leaguePL: "Premier Lig",
    leagueLaLiga: "La Liga",
    leagueTSL: "Süper Lig",
    leagueUCL: "Şampiyonlar Ligi",
    today: "Bugün",
    tomorrow: "Yarın",
    sunday: "Pazar",
    tuesday: "Salı",
    wednesday: "Çarşamba",
    week: "Hafta",
    quarterFinal: "Çeyrek Final",
    derby: "Derbi",
  },
};

export const en: Translations = {
  nav: {
    features: "Features",
    howItWorks: "How It Works",
    leaderboard: "Leaderboard",
    matches: "Matches",
    login: "Log In",
    cta: "Play Now",
  },
  hero: {
    tagline: "Fantasy Football",
    badge: "⚽  New Season Has Started",
    line1: "PREDICT",
    line2: "COMPETE",
    line3: "BECOME A LEGEND",
    subtitle:
      "Predict football matches, earn points for every accurate score, and compete with the best predictors around.",
    cta: "Play Now →",
    ctaSecondary: "How It Works?",
    stat1Value: "12,400+",
    stat1Label: "Active Players",
    stat2Value: "890K+",
    stat2Label: "Predictions",
    stat3Value: "67%",
    stat3Label: "Avg Accuracy",
  },
  matchCard: {
    live: "LIVE",
    prediction: "My Prediction",
    potentialPoints: "Potential Points",
  },
  features: {
    badge: "Why byLiGG?",
    title: "The New Home of Football Predictions",
    subtitle:
      "Don't just predict the winner — predict the exact score. The more accurate you are, the more points you earn.",
    f1Title: "Real-Time Scoring",
    f1Desc:
      "Your points update instantly when the match ends. Track your leaderboard position live.",
    f2Title: "World Leagues",
    f2Desc:
      "Premier League, La Liga, Serie A, Bundesliga, Turkish Super League and dozens more.",
    f3Title: "Custom Tournaments",
    f3Desc:
      "Create private prediction leagues with friends or colleagues. Your rules, your trophy.",
    f4Title: "Detailed Statistics",
    f4Desc: "Your prediction history, accuracy rate, and performance charts all in one screen.",
    f5Title: "Instant Notifications",
    f5Desc: "Get notified instantly for match kick-offs, point updates, and leaderboard changes.",
    f6Title: "Derby Bonus",
    f6Desc: "2x points in derby matches, 3x during campaign weeks. Take risks, earn more.",
  },
  howItWorks: {
    badge: "How It Works",
    title: "How It Works",
    subtitle: "Join the football prediction platform in four simple steps.",
    s1Title: "Create Account",
    s1Desc: "Sign up in seconds with your email or social account.",
    s2Title: "Choose a Match",
    s2Desc: "Pick the league and match you want to predict. Hundreds of options await.",
    s3Title: "Enter Prediction",
    s3Desc: "Submit your exact score prediction. Be bold — exact score means 10 points!",
    s4Title: "Earn Points",
    s4Desc: "Points are added after the match. Climb the leaderboard and dominate.",
  },
  scoring: {
    title: "Scoring System",
    subtitle:
      "Every correct prediction earns points. The more accurate your prediction, the higher your score.",
    exact: "Exact Score",
    exactDesc: "You nailed the exact scoreline",
    winnerDiff: "Winner + Margin",
    winnerDiffDesc: "Correct winner and goal difference",
    winner: "Correct Winner",
    winnerDesc: "You got the winner right",
    draw: "Draw",
    drawDesc: "You predicted the draw",
    close: "1 Goal Off",
    closeDesc: "Off by just one goal",
    wrong: "Wrong Prediction",
    wrongDesc: "Better luck next time",
    multiplierNote: "⚡ Derby matches 2x · Campaign week 3x",
  },
  leaderboard: {
    badge: "Leaderboard",
    title: "Leaderboard",
    subtitle: "Meet this week's top predictors. You could be next.",
    rank: "Rank",
    player: "Player",
    points: "Points",
    accuracy: "Accuracy",
    viewAll: "View Full Leaderboard",
    thisWeek: "This Week",
    live: "Live",
    rankingSystem: "Ranking System",
    multiplierTitle: "🔥 Score Multiplier",
    derby: "⚡ Derby matches",
    campaign: "🚀 Campaign week",
    deadline: "⏰ Prediction deadline",
    tierExact: "Exact Score",
    tierWinnerDiff: "Winner+Margin",
    tierWinner: "Winner",
    tierDraw: "Draw",
    tierClose: "1 Goal Off",
    tierWrong: "Wrong",
  },
  cta: {
    badge: "Start Playing Now!",
    title: "Ready to Play?",
    subtitle: "Create a free account and start playing now. No credit card required.",
    button: "Sign Up Free",
    loginLabel: "Already have an account?",
  },
  theme: {
    title: "Theme",
    teamColor: "Favorite Team",
    teamColorLocked: "Login to unlock",
  },
  register: {
    title: "Sign Up",
    subtitle: "Join the community and start playing",
    displayName: "Display Name",
    displayNamePlaceholder: "GamerPro",
    username: "Username",
    usernamePlaceholder: "gamer_pro99",
    usernameHint: "Letters, numbers, _ and . only",
    email: "Email",
    emailPlaceholder: "gamer@domain.com",
    emailHint: "Private — never shown on your profile.",
    password: "Password",
    passwordPlaceholder: "••••••••",
    passwordHint: "At least 6 characters, 1 letter and 1 number",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "••••••••",
    submit: "Create Account",
    loading: "Creating account...",
    haveAccount: "Already have an account?",
    login: "Log In",
  },
  footer: {
    tagline: "The most exciting football prediction platform.",
    product: "Product",
    features: "Features",
    howItWorks: "How It Works",
    leaderboard: "Leaderboard",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact",
    copyright: "© 2026 byLiGG. All rights reserved.",
    comingSoon: "Coming Soon",
    iosApp: "iOS App",
    androidApp: "Android App",
    apiAccess: "API Access",
  },
  matches: {
    badge: "This Week's Matches",
    title: "Upcoming Matches",
    viewAll: "View All Matches",
    all: "All",
    leaguePL: "Premier League",
    leagueLaLiga: "La Liga",
    leagueTSL: "Super Lig",
    leagueUCL: "Champions League",
    today: "Today",
    tomorrow: "Tomorrow",
    sunday: "Sunday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    week: "Week",
    quarterFinal: "Quarter Final",
    derby: "Derby",
  },
};
