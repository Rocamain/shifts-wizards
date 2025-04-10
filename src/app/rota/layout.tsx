import RouteSelector from "@/ui/Rota/RouteSelector";
import ShopHours from "@/ui/Rota/ShopHours";
import { OpeningTimesProvider } from "@/lib/rota/context/OpeningTimesContext";
import { generateHoursArray } from "@/lib/rota/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shift Wizard Create Rota Main Page`,
  description: "Create your rota for the week",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10 bg-gray-200">
      <h2 className="text-2xl font-semibold">Shift Wizard Rota</h2>
      <div className="py-8 flex justify-between items-center">
        <ShopHours />
        <RouteSelector />
      </div>
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
        {children}
      </OpeningTimesProvider>
    </div>
  );
}
