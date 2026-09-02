import type { Metadata } from "next";
import "./globals.css";
import { BookProvider } from "@/context/book-context";
import { AudioProvider } from "@/context/audio-context";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `صداۓ کتب | ${APP_NAME} — ${APP_TAGLINE}`,
  description: "Turn any PDF, scanned book, or photo into an intelligent audiobook in Urdu and English with emotion-aware narration, chapter detection, and Ask My Book AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Serif:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#131313] text-[#e6e1e5] min-h-screen antialiased selection:bg-[#d4af37] selection:text-[#382900]">
        <BookProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </BookProvider>
      </body>
    </html>
  );
}
