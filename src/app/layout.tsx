import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import { isSupportedLanguage, getSupportedLanguage } from "@/lib/constants/language";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { I18nProvider } from "@/providers/i18n-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { AuthProvider } from "@/providers/auth-provider";
import type { Lang } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "byLiGG Fantazi Futbol",
  description:
    "Futbol maçlarını tahmin et, tam skoru bil, puan kazan ve liderlik tablosunda yüksel.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const themeInitScript = `
try {
  var VALID = ["sapphire","ivory","anthracite","linen"];
  var t = localStorage.getItem("lx-theme");
  document.documentElement.setAttribute("data-theme", (t && VALID.indexOf(t) !== -1) ? t : "sapphire");
  var a = localStorage.getItem("lx-team-accent");
  if (a && /^#[0-9a-fA-F]{6}$/.test(a)) {
    document.documentElement.style.setProperty("--theme-accent", a);
    var r = parseInt(a.slice(1,3),16), g = parseInt(a.slice(3,5),16), b = parseInt(a.slice(5,7),16);
    document.documentElement.style.setProperty("--theme-accent-rgb", r+","+g+","+b);
  }
} catch(e) {}
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cookieStore, headerStore] = await Promise.all([cookies(), headers()]);
  const savedLang = cookieStore.get("lx-lang")?.value;
  const browserLang = getSupportedLanguage((headerStore.get("accept-language") ?? "").split(",")[0]);
  const initialLang: Lang = isSupportedLanguage(savedLang) ? savedLang : browserLang;

  return (
    <html
      lang={initialLang}
      className={`${inter.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col text-white" style={{ background: "#0a0a0a", fontFamily: "var(--font-inter), sans-serif" }}>
        <ThemeProvider>
          <I18nProvider initialLang={initialLang}>
            <AuthProvider>
              <ToastProvider />
              {children}
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
