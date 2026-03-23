
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Bedo Fish - Smoked & Roasted Tilapia Delivered Fresh",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#FFF', minHeight: '100vh', margin: 0 }}>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
