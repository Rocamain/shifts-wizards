import WeeklyRota from "@/ui/Rota/WeeklyRota";

export default async function Page({}: { params: Promise<{ role: string }> }) {
  return (
    <div className="relative">
      <WeeklyRota />
    </div>
  );
}
