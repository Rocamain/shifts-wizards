"use client";

interface EmployeeDashboardHeaderProps {
  search: string;
  onSearch: (name: string) => void;
  onModalOpen: () => void;
}

export default function EmployeeDashboardHeader({
  search,
  onSearch,
  onModalOpen,
}: EmployeeDashboardHeaderProps) {
  return (
    <div className="flex w-full justify-between items-center my-4 gap-4">
      <div>
        <h1 className="text-2xl font-bold">Employee Dashboard</h1>
      </div>
      <div className="flex gap-4">
        <div>
          <input
            type="text"
            className="w-[250px] p-2 border border-gray-300 rounded-md"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={onModalOpen}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
}
