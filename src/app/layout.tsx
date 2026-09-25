import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_SC({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const serif = Noto_Serif_SC({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "进化心理学",
    template: "%s · 进化心理学",
  },
  description:
    "按戴维·巴斯《进化心理学》原书的顺序，先讲清每一站的精华，再用中学生能跟上的五步重讲一遍。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full">{children}        <script src="/reading-room.js" defer></script>
      </body>
    </html>
  );
}
