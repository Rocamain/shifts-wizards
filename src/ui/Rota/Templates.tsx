"use client";

import { usePathname } from "next/navigation";
import Box from "../Other/Box";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

export default function Templates() {
  const pathname = usePathname();
  const employeeRole = pathname.split("/")[2];
  const { loadTemplate, saveToTemplate } = useRotaContext();

  if (!employeeRole) return null;

  return (
    <Box title="Templates">
      <div className="flex flex-col justify-center space-y-6 mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => {
              loadTemplate();
              alert("Template loaded");
            }}
            className="mt-2 hover:underline px-4 py-2 rounded text-white bg-blue-500"
          >
            {`${employeeRole.toUpperCase()} Template`}
          </button>
          <button
            onClick={() => {
              loadTemplate();
            }}
            className="mt-2 hover:underline px-4 py-2 rounded text-white bg-blue-500"
          >
            Full Template
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => saveToTemplate()}
          className="mt-2 hover:underline px-4 py-2 rounded text-white bg-blue-500"
        >
          Add to Template
        </button>
      </div>
    </Box>
  );
}
