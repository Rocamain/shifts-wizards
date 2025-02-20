"use client";
import { useState, useCallback } from "react";
import { Shift, Week, Weekday } from "@/lib/rota/rota";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import WeeklyRota from "@/ui/Rota/WeeklyRota";

export default function RotaTL() {
  const { employees } = useEmployeeContext();

  const teamLeaders = employees.filter((employee) => employee.role === "TL");
  console.log(teamLeaders);

  return (
    <div className="pt-10">
      <WeeklyRota employees={teamLeaders} />
    </div>
  );
}
