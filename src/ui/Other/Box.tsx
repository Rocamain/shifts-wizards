type BoxProps = {
  title: string;
  children: React.ReactNode;
};
export default function Box({ title, children }: BoxProps) {
  return (
    <div className="flex justify-center relative bg-white border border-gray-300 rounded-lg px-7 py-6 shadow-md">
      <div className="absolute -top-[1px] left-1/2 transform -translate-x-1/2 bg-gray-200 text-center px-2 text-gray-600 h-[1px] w-[160px]" />
      <div className="absolute -top-[15px] left-1/2 transform -translate-x-1/2 bg-transparent text-center px-2 text-gray-600 index-9">
        <h3 className="font-semibold text-blue-500 text-xl"> {title} </h3>
      </div>

      <div>{children} </div>
    </div>
  );
}
