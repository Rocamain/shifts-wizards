"use client";

import { useMemo, useCallback } from "react";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import { getEmployeesFromPath } from "@/lib/employees/utils";
import { usePathname } from "next/navigation";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

import { summarizeHoursByRole } from "@/lib/rota/utils";
import { EmployeeRole } from "@/lib/rota/rota";
import RoleSection from "./RoleSection";

export default function EmployeeList() {
  const { employees, addSelectedEmployee, removeSelectedEmployee } =
    useEmployeeContext();
  const { week } = useRotaContext();
  const pathname = usePathname();
  const employeesByRole = useMemo(
    () => getEmployeesFromPath(pathname, employees),
    [pathname, employees]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hours = useMemo(() => summarizeHoursByRole(week), [week, employees]);
  const handleCheckBox = useCallback(
    (id: string, checked: boolean) => {
      return checked ? addSelectedEmployee(id) : removeSelectedEmployee(id);
    },
    [addSelectedEmployee, removeSelectedEmployee]
  );
  const employeeRole = pathname.split("/")[2] as string;
  if (!employees || !employeeRole) return null;

  if (employeeRole !== "full") {
    const roleKey = employeeRole.toUpperCase() as EmployeeRole;
    const title =
      employeeRole === "baker"
        ? `${employeeRole.charAt(0).toUpperCase()}${employeeRole
            .slice(1)
            .toLowerCase()}'s`
        : `${employeeRole.toUpperCase()}'s`;

    return (
      <RoleSection
        title={title}
        employees={employeesByRole}
        hours={hours[roleKey]}
        onCheckBox={handleCheckBox}
        role={roleKey}
      />
    );
  }

  const groups: [EmployeeRole, string][] = [
    ["TL", "TL's"],
    ["CTM", "CTM's"],
  ];

  return (
    <div className="flex flex-col gap-6">
      {groups.map(([role, title]) => (
        <RoleSection
          key={role}
          title={title}
          employees={employeesByRole.filter((e) => e.role === role)}
          hours={hours[role]}
          onCheckBox={handleCheckBox}
          role={role}
        />
      ))}
    </div>
  );
}
