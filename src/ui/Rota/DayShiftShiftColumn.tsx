import { Shift } from "@/lib/rota/rota";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";

type DayShiftShiftColumnProps = {
  shift: Shift;
  colIndex: number;
  openingTimes: string[];
  onShiftClick: (shift: Shift, shiftId: string) => void;
  handleDeleteShift?: (shiftId: string) => void;
};

export default function DayShiftShiftColumn({
  shift,
  colIndex,
  openingTimes,
  onShiftClick,
  handleDeleteShift,
}: DayShiftShiftColumnProps) {
  const { employees } = useEmployeeContext();
  const currentShiftId = shift.id ?? `col-${colIndex}`;
  const assignedEmployee = shift.employee
    ? employees.find((emp) => emp.id === shift.employee)
    : null;
  console.log("render shifts", { shift, assignedEmployee });

  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${openingTimes.length}, auto)`,
      }}
    >
      {openingTimes.map((time, rowIndex) => {
        if (time === shift.startTime) {
          return (
            <div
              onClick={() => onShiftClick(shift, currentShiftId)}
              key={`shift-${currentShiftId}-${rowIndex}`}
              className={`cursor-pointer w-[33px] h-[33px] flex justify-center ${
                assignedEmployee?.color ? assignedEmployee.color : "bg-gray-500"
              } border-b border-r border-gray-300 text-center relative`}
            >
              {handleDeleteShift && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteShift(currentShiftId);
                  }}
                  className="absolute w-[28px] h-[28px] p-[1px] block -top-4 rounded-full bg-white border-2 border-red-400"
                >
                  <span className="flex justify-center">❌</span>
                </button>
              )}
            </div>
          );
        }
        if (time > shift.startTime && time <= shift.endTime) {
          return (
            <div
              onClick={() => onShiftClick(shift, currentShiftId)}
              key={`shift-${currentShiftId}-${rowIndex}`}
              className={`${
                assignedEmployee ? assignedEmployee.color : "bg-gray-500"
              } h-[33px] w-[33px] flex  border-b border-r border-gray-300`}
            />
          );
        }
        return (
          <div
            key={`empty-${currentShiftId}-${rowIndex}`}
            className="h-[33px] w-[33px] border-b border-r border-gray-300"
          />
        );
      })}
    </div>
  );
}
