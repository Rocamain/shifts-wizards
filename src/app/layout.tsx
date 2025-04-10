import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/ui/Navbar/Navbar";
import "./globals.css";
import { EmployeeProvider } from "@/lib/employees/context/EmployeeContext";
import { RotaProvider } from "@/lib/rota/context/RotaContexts";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shift Wizard",
  description: "Generate rotas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <EmployeeProvider>
        <RotaProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased print:w-full min-h-screen mx-auto bg-gray-200 print:bg-transparent`}
          >
            <Navbar />

            <main className="print:w-full w-[1560px] mx-auto">{children}</main>
          </body>
        </RotaProvider>
      </EmployeeProvider>
    </html>
  );
}
