import { Shift, Weekday } from "@/lib/rota/rota";
import { Employee } from "@/lib/employees/employees";
type DayShiftsProps = {
  employees: Employee[];
  shifts: Shift[];
  day: Weekday;
  assignShiftToWeekDay: (day: Weekday, shiftsForDay: Shift[]) => void;
};

export default function DayShifts({ day, employees, shifts }: DayShiftsProps) {
  const handleAssignShiftToWeekDay = (day: Weekday, shiftsForDay: Shift[]) => {
    console.log(day, shiftsForDay, { employees, shifts });
  };
  return <div className="p-4">{day}</div>;
}
