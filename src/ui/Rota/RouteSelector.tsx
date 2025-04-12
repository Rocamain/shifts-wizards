import NavLink from "./NavLink";

export default function RouteSelector({}) {
  return (
    <div>
      <div className="flex justify-end bg-gray-200">
        <div className="relative bg-gray-200 border border-gray-500 rounded px-7 py-6">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-200 text-center px-2 text-gray-600">
            <h3 className="font-semibold bg-gray-200"> Choose a Role </h3>
          </div>
          <nav className="flex justify-center space-x-6">
            <NavLink href={"/rota/tl"}>TL Rota</NavLink>
            <NavLink href={"/rota/ctm"}>CTM Rota</NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
