import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium App - Build Your Future",
  description: "A production-ready full-stack web application",
  keywords: ["web app", "authentication", "dashboard", "premium"],
  authors: [{ name: "Premium App Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premium-app.com",
    title: "Premium App",
    description: "Production-ready full-stack web application",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
