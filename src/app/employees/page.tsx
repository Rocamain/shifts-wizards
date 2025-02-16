"use client";
import { useState } from "react";
import EmployeeTable from "@/ui/Employees/EmployeeTable";
import { EMPLOYEES } from "@/lib/employees/constants";
import { Employee } from "@/lib/employees/employees";
import EmployeeDashboardHeader from "@/ui/Employees/EmployeeDashboardHeader";

export default function EmpoloyeePage() {
  const [employees, setEmployees] = useState(() => EMPLOYEES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleAddEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
  };
  const handleSearch = (name: string) => {
    setSearch(name);
  };
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <EmployeeDashboardHeader
          search={search}
          onSearch={handleSearch}
          onModalOpen={() => setIsModalOpen(true)}
        />
        <EmployeeTable
          employees={filteredEmployees}
          onRemoveEmployee={handleRemoveEmployee}
        />
      </div>
    </div>
  );
}
