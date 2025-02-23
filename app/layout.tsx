import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./font-6/css/all.css";
import "./font-6/css/sharp-light.css";
import "./font-6/css/sharp-regular.css";
import "./font-6/css/sharp-solid.css";
import "./globals.css";
// import "./font-6/css/sharp-thin.css";
// import "./font-6/css/sharp-duotone-light.css";
// import "./font-6/css/sharp-duotone-regular.css";
// import "./font-6/css/sharp-duotone-solid.css";
// import "./font-6/css/sharp-duotone-thin.css";
// import "./font-6/css/duotone-light.css";
// import "./font-6/css/duotone-regular.css";
// import "./font-6/css/duotone-thin.css";
// Load custom fonts
const avenirHeavy = localFont({
  src: "./fonts/AvenirLTStd-Heavy.otf",
  variable: "--font-avenir-heavy",
  display: "swap", // Ensure fonts are swapped in without layout shift
});

const avenirRoman = localFont({
  src: "./fonts/AvenirLTStd-Roman.otf",
  variable: "--font-avenir-roman",
  display: "swap", // Ensure fonts are swapped in without layout shift
});

// Metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Sports Apparel",
    template: "%s | Sports Apparel", // Dynamic title for child routes
  },
  description:
    "Shop the latest sports apparel, gear, and equipment. Fast shipping, great deals, and premium quality for all your sports needs.",
  keywords: [
    "sports apparel",
    "sports",
    "bat",
    "shirts",
    "t shirts",
    "table",
    "shipping",
    "sports gear",
    "sports equipment",
    "athletic wear",
    "sports clothing",
    "sports shoes",
    "team uniforms",
    "sports accessories",
    "fitness gear",
    "outdoor sports",
    "sports discounts",
    "fast shipping sports gear",
    "online sports store",
    "sports ecommerce",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Syed Muhammad Bilal Gillani" }],
  openGraph: {
    title: "Syed Muhammad Bilal Gillani | Professional Software Engineer",
    description:
      "Full-stack developer specializing in modern web technologies and innovative software solutions. View portfolio and professional experience.",
    url: "https://syed-muhammad-bilal-gillani.vercel.app",
    siteName: "Syed Muhammad Bilal Gillani Portfolio",
    images: [
      {
        url: "https://syed-muhammad-bilal-gillani.vercel.app/file.svg",
        width: 1200,
        height: 630,
        alt: "Syed Muhammad Bilal Gillani Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Muhammad Bilal Gillani | Software Engineer & Web Developer",
    description:
      "Professional portfolio showcasing full-stack development expertise and innovative web solutions.",
    creator: "@yourtwitterhandle",
    images: [
      "https://syed-muhammad-bilal-gillani.vercel.app/images/twitter-card.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://syed-muhammad-bilal-gillani.vercel.app",
  },
};

// RootLayout Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="nkI0--ukoJHp2uDQ3_G9yvOCWgmwhiMu5WURXiV9tzw"
        />
        {/* Preload fonts for better performance */}
        {/* <link
          rel="preload"
          href="/fonts/AvenirLTStd-Heavy.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AvenirLTStd-Roman.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        /> */}
      </head>
      <body
        suppressHydrationWarning
        className={`${avenirHeavy.variable} ${avenirRoman.variable} font-sans antialiased bg-backgroundColor text-textColor`}
      >
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem)] mt-16">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
