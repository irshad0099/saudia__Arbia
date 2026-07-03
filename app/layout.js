import { Cairo, Tajawal, Syne, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["500", "600", "700", "800", "900"], variable: "--font-cairo" });
const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["300", "400", "500", "700", "800"], variable: "--font-tajawal" });
const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-inter" });

export const metadata = {
  title: "NexaCore — AI & Digital Transformation | نيكسا كور",
  description:
    "A leading AI and digital transformation partner for regional enterprises — software, mobile, cloud and AI solutions built for the Vision 2030 era.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} ${tajawal.variable} ${syne.variable} ${inter.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
