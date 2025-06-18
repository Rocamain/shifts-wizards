import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/ui/Navbar/Navbar";
import "./globals.css";
import { EmployeeProvider } from "@/lib/employees/context/EmployeeContext";
import { RotaProvider } from "@/lib/rota/context/RotaContexts";
import { OpeningTimesProvider } from "@/lib/rota/context/OpeningTimesContext";
import { generateHoursArray } from "@/lib/rota/utils";
import { RestPriorityProvider } from "@/lib/rota/context/RestPriorityContext";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased print:w-full min-h-screen mx-auto bg-gray-200 print:bg-transparent`}
      >
        <EmployeeProvider>
          <RotaProvider>
            <OpeningTimesProvider
              intialWorkLoad={[
                generateHoursArray({ open: "6:00", close: "22:00" }),
                generateHoursArray({ open: "6:00", close: "22:00" }),
                generateHoursArray({ open: "6:00", close: "22:00" }),
                generateHoursArray({ open: "6:00", close: "22:00" }),
                generateHoursArray({ open: "6:00", close: "22:00" }),
                generateHoursArray({ open: "6:00", close: "22:00" }),
                generateHoursArray({ open: "6:00", close: "22:00" }),
              ]}
            >
              <RestPriorityProvider>
                <Navbar />

                <main className="print:w-full w-[1760px] mx-auto ">
                  {children}
                </main>
              </RestPriorityProvider>
            </OpeningTimesProvider>
          </RotaProvider>
        </EmployeeProvider>
      </body>
    </html>
  );
}
