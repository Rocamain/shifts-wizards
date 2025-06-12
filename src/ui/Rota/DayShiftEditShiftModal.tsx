import { useCallback, useState } from "react";
import Drag from "../Other/Drag";
import { CandidateDropdown } from "./Modal/CadidateDropDown";
import { ModalActions } from "./Modal/ModalActions";
import { TimeInput } from "./Modal/TimeInput";
import { Shift } from "@/lib/rota/rota";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import { getEmployeesFromPath } from "@/lib/employees/utils";
import { usePathname } from "next/navigation";
import { makeUpdatedShift, shiftHours } from "@/lib/rota/utils";
import { useOpeningTimesContext } from "@/lib/rota/context/OpeningTimesContext";
import WeekDay from "./WeekDay";

type DayShiftEditShiftModalProps = {
  shift: Shift;
  onClose: () => void;
};

export default function DayShiftEditShiftModal({
  shift: initialShift,
  onClose,
}: DayShiftEditShiftModalProps) {
  const { employees, addShiftToEmployee, removeShiftToEmployee } =
    useEmployeeContext();
  const { openingTimes } = useOpeningTimesContext();

  const { updateShift, week } = useRotaContext();
  const [shift, setShift] = useState<Shift>(initialShift);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );
  const pathname = usePathname();
  const employesByRole = getEmployeesFromPath(pathname, employees);

  const handleSave = useCallback(() => {
    const prevEmployee = shift.employee ?? null;
    const nextEmployee = selectedCandidate ?? null;

    const updatedShift = makeUpdatedShift(shift, nextEmployee);

    // Case: both prev and next assigned
    if (prevEmployee && nextEmployee) {
      if (prevEmployee !== nextEmployee) {
        removeShiftToEmployee(prevEmployee, shift);
        addShiftToEmployee(nextEmployee, updatedShift);
        updateShift(updatedShift.day, updatedShift);
        return;
      }

      if (
        shift.startTime !== updatedShift.startTime ||
        shift.endTime !== updatedShift.endTime
      ) {
        updateShift(updatedShift.day, updatedShift);
      }
      return;
    }

    // Case: was unassigned, now assigned
    if (!prevEmployee && nextEmployee) {
      addShiftToEmployee(nextEmployee, updatedShift);
      updateShift(updatedShift.day, updatedShift);
      return;
    }

    // Case: was assigned, now unassigned
    if (prevEmployee && !nextEmployee) {
      removeShiftToEmployee(prevEmployee, shift);
      updateShift(updatedShift.day, updatedShift);
      return;
    }

    // Case: still unassigned
    if (
      shift.startTime !== updatedShift.startTime ||
      shift.endTime !== updatedShift.endTime
    ) {
      updateShift(updatedShift.day, updatedShift);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shift,
    selectedCandidate,
    addShiftToEmployee,
    removeShiftToEmployee,
    updateShift,
    WeekDay,
    week,
  ]);

  return (
    <Drag>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-bold">Edit Shift</h3>
        <h3>
          Assigned Shift:{" "}
          {selectedCandidate
            ? employesByRole.find((emp) => emp.id === selectedCandidate)?.name
            : shift.employee
            ? employesByRole.find((emp) => emp.id === shift.employee)?.name
            : "Unassigned"}
        </h3>
        <h3>Role: {shift.employeeRole}</h3>
        <h3>Hours: {shiftHours(shift)}</h3>

        <TimeInput
          label="Start Time"
          value={shift.startTime}
          min={openingTimes[shift.day][1]}
          onChange={(value) => setShift({ ...shift, startTime: value })}
        />
        <TimeInput
          label="End Time"
          max={openingTimes[shift.day].at(-2)}
          value={shift.endTime}
          onChange={(value) => setShift({ ...shift, endTime: value })}
        />

        <CandidateDropdown
          employees={employesByRole}
          selectedCandidate={selectedCandidate}
          newShift={shift}
          onSelectCandidate={setSelectedCandidate}
        />

        <ModalActions
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
