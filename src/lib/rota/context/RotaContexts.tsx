"use client";

import React, { createContext, useContext, useCallback, useState } from "react";
import { INITIAL_WEEK } from "../constants";
import { DayShiftsMap, Shift, Week, Weekday } from "../rota";

interface RotaContextType {
  shifts: Week;
  updateShiftsToWeekDay: (day: Weekday, dayShifts: DayShiftsMap) => void;
  addShift: (day: Weekday, newShift: Shift) => void;
  updateShift: (day: Weekday, shiftToUpdate: Shift) => void;
  deleteShift: (day: Weekday, shiftId: string) => void;
}

const RotaContext = createContext<RotaContextType | undefined>(undefined);

export const RotaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shifts, setShifts] = useState<Week>(INITIAL_WEEK);
  const [assignmentStatus, setAssignmentStatus] = useState<
    "modified" | "saved"
  >("saved");

  const updateShiftsToWeekDay = useCallback(
    (day: Weekday, dayShifts: DayShiftsMap) => {
      setShifts((prevShifts) => {
        const updatedShifts = new Map(prevShifts);
        updatedShifts.set(day, dayShifts);
        return updatedShifts;
      });
      setAssignmentStatus("modified");
    },
    []
  );

  const addShift = (day: Weekday, newShift: Shift) => {
    const newId = newShift.id || `${newShift.startTime}-${newShift.endTime}`;
    const dayShifts = shifts.get(day);
    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.set(newId, newShift);

    const sortedEntries = Array.from(updatedDayShifts.entries()).sort(
      ([, a], [, b]) => a.startTime.localeCompare(b.startTime)
    );
    const sortedDayShifts = new Map(sortedEntries);
    updateShiftsToWeekDay(day, sortedDayShifts);
  };

  const updateShift = (day: Weekday, shiftToUpdate: Shift) => {
    const newId =
      shiftToUpdate.id || `${shiftToUpdate.startTime}-${shiftToUpdate.endTime}`;
    const dayShifts = shifts.get(day);

    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.delete(shiftToUpdate.id!);
    updatedDayShifts.set(newId, shiftToUpdate);

    const sortedEntries = Array.from(updatedDayShifts.entries()).sort(
      ([, a], [, b]) => a.startTime.localeCompare(b.startTime)
    );
    const sortedDayShifts = new Map(sortedEntries);
    updateShiftsToWeekDay(day, sortedDayShifts);
  };

  const deleteShift = (day: Weekday, shiftId: string) => {
    const dayShifts = shifts.get(day);

    const updatedDayShifts = new Map(dayShifts);
    updatedDayShifts.delete(shiftId);
    updateShiftsToWeekDay(day, updatedDayShifts);
  };
  return (
    <RotaContext.Provider
      value={{
        updateShiftsToWeekDay,
        shifts,
        addShift,
        updateShift,
        deleteShift,
      }}
    >
      {children}
    </RotaContext.Provider>
  );
};

export const useRotaContext = (): RotaContextType => {
  const context = useContext(RotaContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  return context;
};
