import DayShifts from "@/ui/Rota/DayShifts";
import DayTitle from "@/ui/Rota/DayTitle";
import { redirect } from "next/navigation";
import React from "react";
type Params = Promise<{
  role: "CTM" | "TL" | "BAKER";
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}>;

export default async function Day({ params }: { params: Params }) {
  const { day, role } = await params;
  if (day === undefined || role === undefined) {
    redirect("/rota");
  }
  return (
    <div className="flex-1 border border-gray-600 min-w-[221px] max-w-fit">
      <DayTitle day={day} />
      <DayShifts day={day} />
    </div>
  );
}
