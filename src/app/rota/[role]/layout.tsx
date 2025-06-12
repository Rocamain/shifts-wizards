import Templates from "@/ui/Rota/Templates";
import EmployeeList from "@/ui/Employees/EmployeeList";
import RouteSelector from "@/ui/Rota/RouteSelector";
import ShopHours from "@/ui/Rota/ShopHours";

type Params = Promise<{
  role: "CTM" | "TL" | "BAKER";
  searchParams: { [key: string]: string | string[] | undefined };
}>;

const roleObject = {
  CTM: "Customer Team Member",
  TL: "Team Leader",
  BAKER: "Baker",
  FULL: "All employees",
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { role: role } = await params;

  const rolepath = role.toUpperCase();
  const roleTitle = roleObject[rolepath as keyof typeof roleObject];
  if (
    role.toUpperCase() === "CTM" ||
    role.toUpperCase() === "TL" ||
    role.toUpperCase() === "BAKER" ||
    role.toUpperCase() === "FULL"
  ) {
    return {
      title: `Shift Wizard Create Rota - ${rolepath}`,
      description: `Create your rota for the week to ${roleTitle} `,
    };
  }
};

export default async function LayoutRole({
  children,
}: {
  children: React.ReactNode;
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <div className="flex justify-end space-x-4">
        <RouteSelector />
      </div>
      <div className="py-8 flex items-start justify-between flex-wrap">
        <div className="w-[377px]">
          <Templates />
        </div>
        <div className="">
          <EmployeeList />
        </div>
        <div>
          <ShopHours />
        </div>
      </div>
      {children}
    </>
  );
}
