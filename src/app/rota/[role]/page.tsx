import WeeklyRota from "@/ui/Rota/WeeklyRota";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ role: "TL" }, { role: "CTM" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;

  const employeeRole = role.toLocaleUpperCase();
  if (employeeRole === "CTM" || employeeRole === "TL") {
    return (
      <>
        <div>
          <h2 className="text-xl font-bold mb-4">
            {employeeRole === "TL" ? "Team Leaders" : "Customer Team member"}
          </h2>
        </div>
        <WeeklyRota />
      </>
    );
  }
  return notFound();
}
