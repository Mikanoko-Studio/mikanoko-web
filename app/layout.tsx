import type { Metadata } from "next";
import { DM_Mono, Zen_Kaku_Gothic_New, Zen_Maru_Gothic } from "next/font/google";
import { Footer } from "@/components/studio/Footer";
import { Header } from "@/components/studio/Header";
import { StudioSecrets } from "@/components/play/StudioSecrets";
import { site } from "@/lib/site";
import "./globals.css";

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // "./" resolves against metadataBase per route, so every page gets its own
  // canonical without repeating the domain anywhere.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GB",
    url: "./",
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${zenMaru.variable} ${zenKaku.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StudioSecrets />
      </body>
    </html>
  );
}
