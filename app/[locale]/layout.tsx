import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../providers";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

// font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tour Website",
  description: "Book your next adventure",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale?: string };
}) {
  let messages;

  console.log("Locale in RootLayout:", params);

  try {
    messages = (await import(`../../messages/${params?.locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={params?.locale}>
      <body
        className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider locale={params?.locale} messages={messages}>
          <Providers>
            <ConfigProvider
              wave={{ disabled: true }}
              theme={{
                components: {
                  Button: { controlHeight: 38 },
                  Radio: {
                    colorPrimary: "#ff6900",
                    colorPrimaryHover: "#3c4fde",
                    colorPrimaryActive: "#ff0000",
                  },
                  Table: {
                    headerColor: "#222",
                    cellPaddingBlock: 10,
                  },
                  Form: {
                    colorTextPlaceholder: "#0005",
                    fontFamily: "Poppins, sans-serif",
                    labelFontSize: 12,
                    labelColor: "#888",
                  },
                },
                token: {
                  colorTextPlaceholder: "#0005",
                  borderRadius: 5,
                  colorPrimary: "#ff6900",
                  fontFamily: "Poppins, sans-serif",
                },
              }}
            >
              <Header />

              <main>
                {children}
                <Toaster position="bottom-right" richColors />
              </main>

              <Footer />
            </ConfigProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
