import React, { useState } from "react";
import { usePathname } from "next/navigation";
import DayShiftTimeColumn from "./DayShiftTimeColumn";
import DayShiftShiftColumn from "./DayShiftShiftColumn";
import DayShiftEditShiftModal from "./DayShiftEditShiftModal";
import { Shift } from "@/lib/rota/rota";

type DayShiftsGridProps = {
  shifts: Shift[];
  openingTimes: string[];
  deleteShift: (shiftId: string) => void;
};

export default function DayShiftsGrid({
  shifts,
  openingTimes,
}: DayShiftsGridProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const employeeRolePath = usePathname().split("/")[2].toUpperCase();

  const shiftsByRole = shifts.filter(({ employeeRole }) => {
    if (
      employeeRolePath === "CTM" ||
      employeeRolePath === "TL" ||
      employeeRolePath === "BAKER"
    ) {
      return employeeRole === employeeRolePath;
    }
    if (employeeRolePath === "FULL") {
      return true;
    }
  });

  const handleShiftClick = (shift: Shift) => {
    setOpen(true);
    setSelectedShift(shift);
  };

  const handleModalClose = () => {
    setOpen(false);
    setSelectedShift(null);
  };
  return (
    <div
      className="grid grid-flow-col gap-0 border border-gray-200 "
      style={{
        gridTemplateColumns: `repeat(${shifts.length + 1}, min-content)`,
      }}
    >
      <DayShiftTimeColumn openingTimes={openingTimes} />
      {shiftsByRole.map((shiftItem) => (
        <DayShiftShiftColumn
          key={shiftItem.id}
          shift={shiftItem}
          openingTimes={openingTimes}
          onShiftClick={handleShiftClick}
        />
      ))}
      {open && selectedShift && (
        <DayShiftEditShiftModal
          shift={selectedShift}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
