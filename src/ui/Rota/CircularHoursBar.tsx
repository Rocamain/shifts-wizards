interface CircularHoursBarProps {
  percentage: number;
}

const gradient = (percentage: number) => {
  const arcAngle = (percentage / 100) * 360;
  console.log(percentage, arcAngle);
  if (arcAngle <= 0) {
    return `conic-gradient(from 0deg, rgb(195, 197, 191) 0deg, rgb(195, 197, 191) 360deg 360deg)`;
  }

  return `conic-gradient(from 0deg, rgb(195, 197, 191) 0deg, rgb(58, 118, 228) ${arcAngle}deg, rgb(28, 78, 241) ${arcAngle}deg, rgb(195, 197, 191) ${arcAngle}deg 360deg)`;
};

export default function CircularHoursBar({
  percentage,
}: CircularHoursBarProps) {
  return (
    <div className="mt-8 flex items-center justify-center">
      <div
        className="relative w-[90px] h-[90px] rounded-full"
        style={{
          background: gradient(percentage),
        }}
      >
        <div className="absolute inset-2 flex items-center justify-center bg-gray-200 rounded-full">
          <span className="font-semibold text-black">
            {percentage.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
