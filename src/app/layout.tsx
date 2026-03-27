import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

const themeInitScript = `
try {
  var VALID = ["sapphire","ivory","anthracite","linen"];
  var t = localStorage.getItem("lx-theme");
  if (t && VALID.indexOf(t) !== -1) document.documentElement.setAttribute("data-theme", t);
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
  const cookieStore = await cookies();
  const rawLang = cookieStore.get("lx-lang")?.value;
  const initialLang: Lang = rawLang === "en" ? "en" : "tr";

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
