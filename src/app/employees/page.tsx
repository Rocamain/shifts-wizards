"use client";
import { useState } from "react";
import EmployeeTable from "@/ui/Employees/EmployeeTable";
import EmployeeDashboardHeader from "@/ui/Employees/EmployeeDashboardHeader";
import AddEmployeeModal from "@/ui/Employees/AddEmployeeModal";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";

export default function EmpoloyeePage() {
  const { employees, addEmployee, removeEmployee } = useEmployeeContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (name: string) => {
    setSearch(name);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
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
            onRemoveEmployee={removeEmployee}
          />
        </div>
      </div>
      {isModalOpen && (
        <AddEmployeeModal
          onClose={() => setIsModalOpen(false)}
          onAddEmployee={addEmployee}
        />
      )}
    </>
  );
}
