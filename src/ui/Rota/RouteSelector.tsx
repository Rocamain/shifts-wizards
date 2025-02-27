interface RouteSelectorProps {
  selectedRota: string | null;
  onSelectRoute: (route: string) => void;
}

export default function RouteSelector({
  selectedRota,
  onSelectRoute,
}: RouteSelectorProps) {
  return (
    <div className="mt-8 flex justify-end bg-gray-200">
      <div className="relative bg-gray-200 border border-gray-500 rounded px-7 py-6">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 text-center px-2 text-gray-600">
          <h3 className="font-semibold bg-gray-200"> Choose a Role </h3>
        </div>
        <ul className="flex justify-center space-x-6">
          <li>
            <button
              onClick={() => onSelectRoute("tl")}
              className={`hover:underline px-4 py-2 rounded ${
                selectedRota === "tl"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              TL Rota
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelectRoute("ctm")}
              className={`hover:underline px-4 py-2 rounded ${
                selectedRota === "ctm"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              CTM Rota
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
