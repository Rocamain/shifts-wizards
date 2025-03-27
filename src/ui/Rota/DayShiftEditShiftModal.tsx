import { useCallback, useState } from "react";
import Drag from "../Other/Drag";
import { CandidateDropdown } from "./Modal/CadidateDropDown";
import { ModalActions } from "./Modal/ModalActions";
import { TimeInput } from "./Modal/TimeInput";
import { Shift } from "@/lib/rota/rota";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

type DayShiftEditShiftModalProps = {
  shift: Shift;
  onClose: () => void;
};

export default function DayShiftEditShiftModal({
  shift: initialShift,
  onClose,
}: DayShiftEditShiftModalProps) {
  const { employees } = useEmployeeContext();
  const { updateShift } = useRotaContext();
  const [shift, setShift] = useState<Shift>(initialShift);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  );

  const handleSave = useCallback(() => {
    if (selectedCandidate !== null) {
      const updatedShift = {
        ...shift,
        employee: selectedCandidate,
        candidates: [selectedCandidate],
      };
      updateShift(shift.day, updatedShift);
    } else {
      const updatedShift = { ...shift };
      delete updatedShift.candidates;
      delete updatedShift.employee;

      updateShift(shift.day, updatedShift);
    }
  }, [shift, selectedCandidate, updateShift]);

  return (
    <Drag>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-lg font-bold">Edit Shift</h3>
        <h3>
          Assigned Shift:{" "}
          {shift.employee
            ? employees.find((emp) => emp.id === selectedCandidate)?.name
            : "None"}
        </h3>

        <TimeInput
          label="Start Time"
          value={shift.startTime}
          onChange={(value) => setShift({ ...shift, startTime: value })}
        />

        <TimeInput
          label="End Time"
          value={shift.endTime}
          onChange={(value) => setShift({ ...shift, endTime: value })}
        />

        <CandidateDropdown
          employees={employees}
          selectedCandidate={selectedCandidate}
          shift={shift}
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
