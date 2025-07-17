import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./providers";
import { Toaster } from "sonner";

// Poppins font config
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tour Website",
  description: "Book your next adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main>
            {children}
            <Toaster position="bottom-right" richColors />
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
