"use client";

import { useCallback, useState, useEffect } from "react";
import Drag from "../Other/Drag";
import { CandidateDropdown } from "./Modal/CadidateDropDown";
import { ModalActions } from "./Modal/ModalActions";
import { TimeInput } from "./Modal/TimeInput";
import { Shift } from "@/lib/rota/rota";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { getEmployeesFromPath } from "@/lib/employees/utils";
import { usePathname } from "next/navigation";
import { calculateShiftHours, makeUpdatedShift } from "@/lib/rota/utils";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";

type DayShiftEditShiftModalProps = {
  shift: Shift;
  onClose: () => void;
};

type ShiftTimes = {
  startTime: string;
  endTime: string;
};

function useShiftTimes(initial: ShiftTimes) {
  const [times, setTimes] = useState<ShiftTimes>(initial);

  const setStartTime = (startTime: string) =>
    setTimes((t) => ({ ...t, startTime }));
  const setEndTime = (endTime: string) => setTimes((t) => ({ ...t, endTime }));

  const isValid = times.startTime < times.endTime;

  return { times, setStartTime, setEndTime, isValid };
}

type AssignedInfoProps = {
  employeeId: string | null;
  employees: Array<{ id: string; name?: string }>;
};

function AssignedInfo({ employeeId, employees }: AssignedInfoProps) {
  const name = employeeId
    ? employees.find((e) => e.id === employeeId)?.name
    : null;
  return (
    <p>
      <strong> Assigned:</strong> {name ?? "Unassigned"}
    </p>
  );
}

export default function DayShiftEditShiftModal({
  shift: initialShift,
  onClose,
}: DayShiftEditShiftModalProps) {
  const pathname = usePathname();
  const { employees, addShiftToEmployee, removeShiftToEmployee } =
    useEmployeeContext();
  const { openingTimes } = useOpeningTimesContext();
  const { updateShift } = useRotaContext();

  const employeesByRole = getEmployeesFromPath(pathname, employees);

  const { times, setStartTime, setEndTime, isValid } = useShiftTimes({
    startTime: initialShift.startTime,
    endTime: initialShift.endTime,
  });

  const [shift, setShift] = useState<Shift>({
    ...initialShift,
    startTime: times.startTime,
    endTime: times.endTime,
  });

  // Sync internal shift when times change
  useEffect(() => {
    setShift((prev) => ({
      ...prev,
      startTime: times.startTime,
      endTime: times.endTime,
    }));
  }, [times]);

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    initialShift.employee ?? null
  );
  const handleSave = useCallback(() => {
    if (!isValid) return; // don’t save if times are invalid

    const prevEmp = initialShift.employee ?? null;
    const nextEmp = selectedCandidate ?? null;

    // build the updated Shift (it will include the new times from `shift`)
    const updated = makeUpdatedShift(shift, nextEmp);

    // did the times change at all?
    const timesChanged =
      initialShift.startTime !== updated.startTime ||
      initialShift.endTime !== updated.endTime;

    if (prevEmp !== nextEmp) {
      // --- employee changed (or assignment toggled) ---
      if (prevEmp) removeShiftToEmployee(prevEmp, initialShift);
      if (nextEmp) addShiftToEmployee(nextEmp, updated);
    } else if (prevEmp && timesChanged) {
      // --- same employee, but times changed ---
      // remove the old copy, then add the updated one
      removeShiftToEmployee(prevEmp, initialShift);
      addShiftToEmployee(prevEmp, updated);
    }
    // else: same employee & same times ⇒ nothing to do on employees

    // finally update the master rota regardless of which case
    updateShift(updated.day, updated);
  }, [
    isValid,
    initialShift,
    shift,
    selectedCandidate,
    removeShiftToEmployee,
    addShiftToEmployee,
    updateShift,
  ]);

  return (
    <Drag>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-600">Edit Shift</h3>
        <div className="flex gap-6 py-4">
          <AssignedInfo
            employeeId={selectedCandidate}
            employees={employeesByRole}
          />

          <p>
            <strong>Role:</strong> {shift.employeeRole}
          </p>

          <p>
            <strong> Hours: </strong> {calculateShiftHours(shift)}
          </p>
        </div>
        <TimeInput
          label="Start Time"
          value={times.startTime}
          min={openingTimes[shift.day][0]}
          onChange={setStartTime}
        />

        <TimeInput
          label="End Time"
          value={times.endTime}
          max={openingTimes[shift.day].at(-1)}
          onChange={setEndTime}
        />

        {!isValid && (
          <p className="text-sm text-red-600" role="alert">
            Start time must be before end time.
          </p>
        )}

        <CandidateDropdown
          employees={employeesByRole}
          selectedCandidate={selectedCandidate}
          newShift={shift}
          onSelectCandidate={setSelectedCandidate}
        />

        <ModalActions
          data-testid="modal-actions"
          // disableSave={!isValid}
          onCancel={onClose}
          onSave={() => {
            handleSave();
            onClose();
          }}
        />
      </div>
    </Drag>
  );
}
