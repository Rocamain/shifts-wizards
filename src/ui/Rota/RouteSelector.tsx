import NavLink from "../Other/NavLink";
import Box from "../Other/Box";
export default function RouteSelector({}) {
  return (
    <Box title="Choose a Rota">
      <nav className="flex justify-center space-x-6">
        <NavLink href={"/rota/tl"}>TL Rota</NavLink>
        <NavLink href={"/rota/ctm"}>CTM Rota</NavLink>
        <NavLink href={"/rota/baker"}>Baker Rota</NavLink>
        <NavLink href={"/rota/full"}>Full Rota</NavLink>
      </nav>
    </Box>
  );
}
