import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import Modal from "./components/modals/Modal";

export const metadata: Metadata = {
  title: "Stay Villa 🌟",
  description: "Premium room booking website",
};

const font = Nunito({
  subsets: ["latin"]
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Modal title="Hello World" isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
