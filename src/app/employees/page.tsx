"use client";
import { useState, useEffect } from "react";
import EmployeeTable from "@/ui/Employees/EmployeeTable";
import { EMPLOYEES } from "@/lib/employees/constants";
import { Employee } from "@/lib/employees/employees";
import EmployeeDashboardHeader from "@/ui/Employees/EmployeeDashboardHeader";
import {
  getEmployeeColor,
  getPermutationBasedOnWeek,
} from "@/lib/employees/utils";
import AddEmployeeModal from "@/ui/Employees/AddEMployeeModal";

export default function EmpoloyeePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const JSON_Employees = localStorage.getItem("employees");
    if (JSON_Employees) {
      const parsedEmployees = JSON.parse(JSON_Employees);
      const permutedEmployees = getPermutationBasedOnWeek(parsedEmployees);
      setEmployees(permutedEmployees);
    } else {
      const employeesWithColors = EMPLOYEES.map((employee) => ({
        ...employee,
        color: getEmployeeColor(employee.id),
      }));

      setEmployees(employeesWithColors);
      localStorage.setItem("employees", JSON.stringify(EMPLOYEES));
    }
    setIsMounted(true);
  }, []);

  const handleRemoveEmployee = (employeeId: string) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    const employeesWithColors = [...employees, newEmployee].map((employee) => ({
      ...employee,
      color: getEmployeeColor(employee.id),
    }));

    localStorage.setItem("employees", JSON.stringify(employeesWithColors));

    setEmployees(employeesWithColors);
  };

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    isMounted && (
      <>
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
        {isModalOpen && (
          <AddEmployeeModal
            onClose={() => setIsModalOpen(false)}
            onAddEmployee={handleAddEmployee}
          />
        )}
      </>
    )
  );
}
