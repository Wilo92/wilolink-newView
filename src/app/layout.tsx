import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: si tu dominio real termina siendo otro (.com en vez de .online, etc.)
// cambia SOLO esta línea, todo lo demás la usa automáticamente.
const SITE_URL = "https://wilolink.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "WiloLink | Mantenimiento, redes y desarrollo web en Dosquebradas, pereira  , risaralda, colombia",
    template: "%s | WiloLink",
  },

  description:
    "Mantenimiento de computadores, administración de redes, enseñanza en informática y desarrollo de sitios web a la medida. Atención personalizada en Dosquebradas, Risaralda, en remoto o presencial.",

  keywords: [
    "mantenimiento de computadores Dosquebradas",
    "reparación de laptops Pereira",
    "administración de redes Risaralda",
    "desarrollo web Pereira",
    "clases de informática básica",
    "soporte técnico Dosquebradas",
  ],

  authors: [{ name: "Wilmer Restrepo" }],
  creator: "Wilmer Restrepo",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: "WiloLink",
    title: "WiloLink | Mantenimiento, redes y desarrollo web en Dosquebradas",
    description:
      "Mantenimiento de computadores, administración de redes, enseñanza en informática y desarrollo de sitios web a la medida.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WiloLink — Tecnología que se entiende",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WiloLink | Mantenimiento, redes y desarrollo web en Dosquebradas",
    description:
      "Mantenimiento de computadores, administración de redes, enseñanza en informática y desarrollo de sitios web a la medida.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "WiloLink",
  image: `${SITE_URL}/opengraph-image`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+573003553762",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dosquebradas",
    addressRegion: "Risaralda",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 4.8448206193856,
    longitude: -75.67027428147132,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    "https://github.com/Wilo92",
    "https://www.linkedin.com/in/wilmer-restrepo-830544242/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <CustomCursor />
      </body>
    </html>
  );
}