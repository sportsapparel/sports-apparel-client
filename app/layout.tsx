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
  authors: [{ name: "Sports Apparel", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Sports Apparel",
    description:
      "Shop the latest sports apparel, gear, and equipment. Fast shipping, great deals, and premium quality for all your sports needs.",
    url: "https://yourwebsite.com",
    siteName: "Sports Apparel",
    // images: [
    //   {
    //     url: "https://", // Add your OpenGraph image
    //     width: 1200,
    //     height: 630,
    //     alt: "Sports Apparel",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  // themeColor: "#FFFFFF", // Set your theme color
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
