import RouteSelector from "@/ui/Rota/RouteSelector";
import ShopHours from "@/ui/Rota/ShopHours";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Shift Wizard Create Rota Main Page`,
  description: "Create your rota for the week",
};
type Params = Promise<{ role: "CTM" | "TL" }>;

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  return (
    <div className="mt-10 bg-gray-200">
      <h2 className="text-2xl font-semibold">Shift Wizard Rota</h2>
      <div className="py-8 flex justify-between items-center">
        <ShopHours />
        <RouteSelector />
      </div>

      {children}
    </div>
  );
}
