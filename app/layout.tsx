import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./_components/menu";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="`${inter.className}` bg-gray-100 overflow-x-hidden mb-[60px]">
        <div>
          {children}
          <Navigation />
        </div>
        <div>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                textAlign: "center",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
