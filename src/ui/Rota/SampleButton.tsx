"use client";
import { SAMPLE } from "@/lib/rota/constants";
import { useRotaContext } from "@/lib/rota/context/RotaContexts";

export default function SampleButton() {
  const { loadTemplate } = useRotaContext();
  return (
    <div>
      <button
        className="mt-2 hover:bg-blue-400 px-4 py-2 rounded text-white bg-blue-500"
        onClick={() => loadTemplate(SAMPLE)}
      >
        Load Sample
      </button>
    </div>
  );
}
