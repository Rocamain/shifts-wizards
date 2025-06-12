// components/EmployeeCheckBox.tsx

"use client";
import { useEffect, useState, useCallback } from "react";
import { Employee, UnassignedShiftEmployee } from "@/lib/employees/employees";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";
import Link from "next/link";

type EmployeeCheckBoxProps = {
  employee: Employee | UnassignedShiftEmployee;
  onCheckBox: (employeeId: string, isChecked: boolean) => void;
};

export default function EmployeeCheckBox({
  employee,
  onCheckBox,
}: EmployeeCheckBoxProps) {
  const [isChecked, setChecked] = useState(true);
  const { week } = useRotaContext();

  useEffect(() => {
    setChecked(true);
  }, [week]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      onCheckBox(employee.id, checked);
      setChecked(checked);
    },
    [onCheckBox, employee.id]
  );

  const isPlaceholder = employee.id === "unassigned";
  const fontColor = isPlaceholder
    ? ""
    : employee.contractHours - employee.totalWorkedHours <= 0
    ? "text-green-500"
    : "text-red-500";
  const checkboxColor = employee.color
    ? employee.color.replace("bg-", "accent-")
    : "accent-gray-500";

  return (
    <div className="relative flex items-center justify-between w-full gap-2">
      <div className="absolute top-0 -left-6">
        {employee.isBaker ? "🥐" : ""}
      </div>
      <input
        id={employee.id}
        name={employee.id}
        type="checkbox"
        checked={isChecked}
        className={`${checkboxColor} print:hidden`}
        onChange={handleChange}
      />

      {/* Name with ellipsis */}
      <label htmlFor={employee.id} className="flex-1 min-w-0 truncate">
        <Link
          href={`/employees/${employee.id}`}
          onClick={(e) => e.stopPropagation()}
          className="block pl-1 py-1 pr-2"
        >
          {employee.name}
        </Link>
      </label>

      {/* Hours aligned */}
      <span className={`${fontColor} font-semibold flex-shrink-0`}>
        {employee.totalWorkedHours}h
      </span>
    </div>
  );
}
