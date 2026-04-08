import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import PageLoader from "../components/PageLoader";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "Bedo Fish - Smoked & Roasted Tilapia Delivered Fresh",
  description: "Africa's finest smoked and roasted tilapia, delivered fresh from Lake Victoria to your table. Fueling healthier diets and empowering communities.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/images/bedo-loader.gif" as="image" fetchPriority="high" />
      </head>
      <body style={{ background: '#FFF', minHeight: '100vh', margin: 0 }}>
        <CartProvider>
          <PageLoader />
          <Navbar />
          <div>{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
