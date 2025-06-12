import WeeklyRota from "@/ui/Rota/WeeklyRota";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ role: "TL" }, { role: "CTM" }, { role: "BAKER" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const roleTitle: Map<string, string> = new Map([
    ["ctm", "Customer Team Member's Rota"],
    ["tl", "Team Leader's Rota"],
    ["baker", "Bakers Rota"],
    ["full", "General Rota"],
  ]);
  if (roleTitle.get(role.toLowerCase())) {
    return (
      <div className="overflow-auto relative">
        <div>
          <h2 className="text-xl font-bold mb-4">
            {roleTitle.get(role.toLowerCase())}
          </h2>
        </div>
        <WeeklyRota />
      </div>
    );
  }
  return notFound();
}
