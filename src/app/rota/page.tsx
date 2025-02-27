"use client";
import { useState } from "react";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import WeeklyRota from "@/ui/Rota/WeeklyRota";
import HoursInput from "@/ui/Rota/HoursInput";
import RouteSelector from "@/ui/Rota/RouteSelector";
import CircularHoursBar from "@/ui/Rota/CircularHoursBar";

export default function Rota() {
  const [selectedRota, setSelectedRota] = useState<string | null>(null);
  const [hours, setHours] = useState<string>("");
  const { employees } = useEmployeeContext();

  const teamLeaders = employees.filter((employee) => employee.role === "TL");
  const ctmLeaders = employees.filter((employee) => employee.role === "CTM");

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setHours(value);
    }
  };

  // Calculate percentage based on 40 hours full-time
  const percentage = hours ? Math.min((parseInt(hours) / 40) * 100, 100) : 0;

  // Toggle route selection: if already selected, deselect it.
  const handleSelectRoute = (route: string) => {
    if (selectedRota === route) {
      setSelectedRota(null);
    } else {
      setSelectedRota(route);
    }
  };

  return (
    <div className="mt-10 bg-gray-200">
      <div className="text-2xl font-semibold">Shift Wizard Rota</div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-10">
          <HoursInput hours={hours} onHoursChange={handleHoursChange} />
          <CircularHoursBar percentage={percentage} />
        </div>
        <RouteSelector
          selectedRota={selectedRota}
          onSelectRoute={handleSelectRoute}
        />
      </div>
      <div className="mt-8">
        {selectedRota === "tl" && (
          <WeeklyRota employees={teamLeaders} title="TL Rota" />
        )}
        {selectedRota === "ctm" && (
          <WeeklyRota employees={ctmLeaders} title="CTM Rota" />
        )}
      </div>
    </div>
  );
}
