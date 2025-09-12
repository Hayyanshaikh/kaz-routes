import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import Providers from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
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
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  controlHeight: 38,
                },
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
      </body>
    </html>
  );
}
