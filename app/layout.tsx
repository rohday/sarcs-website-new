import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getLabInfo } from "@/lib/data";
import { CONTRACT } from "@/lib/direction-contract";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: {
    default: "SARCS Lab — IIIT Hyderabad",
    template: "%s | SARCS Lab",
  },
  description:
    "Sustainable, Advanced and Robust Computing Systems Laboratory at IIIT Hyderabad. Research in computer architecture, in-memory computing, RISC-V, quantum computing, and hardware accelerators.",
  keywords: [
    "SARCS Lab",
    "IIIT Hyderabad",
    "Computer Architecture",
    "In-Memory Computing",
    "RISC-V",
    "Quantum Computing",
    "Hardware Accelerators",
    "Edge AI",
  ],
  authors: [{ name: "SARCS Lab, IIIT Hyderabad" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SARCS Lab",
    title: "SARCS Lab — IIIT Hyderabad",
    description:
      "Research in next-generation computing: in-memory computing, RISC-V, quantum computing, hardware accelerators, and edge AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jbmono.variable} min-h-screen flex flex-col`}>
        {/* Direction contract — first child of body, survives static export (grep for 0cf70ea1 in /out) */}
        <span
          aria-hidden
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{ __html: `<!-- ${CONTRACT} -->` }}
        />

        <Navbar />

        <main className="flex-1" style={{ position: "relative" }}>
          {children}
        </main>

        <Footer labInfo={getLabInfo()} />
      </body>
    </html>
  );
}
