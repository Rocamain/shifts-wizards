"use client";

import React, { useState, useEffect } from "react";
import { useEmployeeContext } from "@/lib/employees/context/EmployeeContext";
import EmployeeDetails from "@/ui/Employees/EmployeeDetails";
import { Employee } from "@/lib/employees/employees";

interface EmployeePageProps {
  params: Promise<{ id: string }>;
}

export default function EmployeePage({ params }: EmployeePageProps) {
  const { employees, updateEmployee } = useEmployeeContext();
  const [isMounted, setMounted] = useState<boolean>(false);
  const { id } = React.use(params);
  const employee = employees.find((emp) => emp.id === id);

  useEffect(() => {
    if (id) {
      setMounted(true);
    }
  }, [id]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedEmployee: Employee) => {
    updateEmployee(updatedEmployee.id, updatedEmployee);
    setIsEditing(false);
  };
  if (isMounted) {
    if (!employee) {
      return <p>Employee not found</p>;
    }
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
        <EmployeeDetails
          employee={employee}
          isEditing={isEditing}
          onEditToggle={() => setIsEditing((prev) => !prev)}
          onSave={handleSave}
        />
      </div>
    );
  }
}
