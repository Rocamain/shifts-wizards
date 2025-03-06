// /src/ui/Rota/DayShiftsGrid.tsx
import React, { useState } from "react";
import DayShiftTimeColumn from "./DayShiftTimeColumn";
import DayShiftShiftColumn from "./DayShiftShiftColumn";
import DayShiftEditShiftModal from "./DayShiftEditShiftModal";
import { Shift } from "@/lib/rota/rota";

type DayShiftsGridProps = {
  shifts: Shift[];
  openingTimes: string[];
  handleDeleteShift?: (shiftId: string) => void;
  handleUpdateShift?: (updatedShift: Shift, shiftId: string) => void;
};

export default function DayShiftsGrid({
  shifts,
  openingTimes,
  handleDeleteShift,
  handleUpdateShift,
}: DayShiftsGridProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null);

  const handleShiftClick = (shift: Shift, shiftId: string) => {
    setOpen(true);
    setSelectedShift(shift);
    setSelectedShiftId(shiftId);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleModalSave = (updatedShift: Shift) => {
    if (selectedShiftId && handleUpdateShift) {
      handleUpdateShift(updatedShift, selectedShiftId);
    }
  };

  return (
    <div
      className="grid grid-flow-col gap-0 border border-gray-200"
      style={{
        gridTemplateColumns: `repeat(${shifts.length + 1}, min-content)`,
      }}
    >
      <DayShiftTimeColumn openingTimes={openingTimes} />
      {shifts.map((shiftItem, colIndex) => (
        <DayShiftShiftColumn
          key={shiftItem.id ?? `col-${colIndex}`}
          shift={shiftItem}
          colIndex={colIndex}
          openingTimes={openingTimes}
          onShiftClick={handleShiftClick}
          handleDeleteShift={handleDeleteShift}
        />
      ))}
      {open && selectedShift && (
        <DayShiftEditShiftModal
          shift={selectedShift}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
}
