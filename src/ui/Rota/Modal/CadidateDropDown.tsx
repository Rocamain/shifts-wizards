import { Employee } from "@/lib/employees/employees";
import { Shift } from "@/lib/rota/rota";
import { useState } from "react";

type CandidateDropdownProps = {
  employees: Employee[]; // Adjust the type based on your employee model
  selectedCandidate: string | null;
  shift: Shift;
  onSelectCandidate: (candidate: string | null) => void;
};

export function CandidateDropdown({
  employees,
  selectedCandidate,
  shift,
  onSelectCandidate,
}: CandidateDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleCandidateSelect = (candidate: string | null) => {
    onSelectCandidate(candidate);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">
        Candidate
      </label>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:ring-blue-500 focus:outline-none flex justify-between items-center"
        >
          <span>
            {selectedCandidate !== null
              ? employees.find((emp) => emp.id === selectedCandidate)?.name
              : "Select Candidate"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {employees.map((employee) => (
              <li
                key={employee.id}
                onClick={() => handleCandidateSelect(employee.id)}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                  isEmployeeAvailableForShift(employee, shift)
                    ? "hover:bg-blue-100 text-gray-900"
                    : "hover:bg-red-100 text-red-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`${employee.color} w-4 h-4 border border-gray-500`}
                  />
                  <div>{employee.name}</div>
                </div>
                {isEmployeeAvailableForShift(employee, shift) ? (
                  <span className="text-xs text-blue-500 font-semibold">
                    Eligible
                  </span>
                ) : (
                  <span className="text-xs text-red-500 font-semibold">
                    Ineligible
                  </span>
                )}
              </li>
            ))}
            <li
              key="unassigned"
              onClick={() => handleCandidateSelect(null)}
              className="px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-blue-100 text-gray-900"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gray-300 w-4 h-4 border border-gray-500" />
                <div>Unassigned</div>
              </div>
              <span className="text-xs text-blue-500 font-semibold">
                Eligible
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
