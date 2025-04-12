import WeekDay from "./WeekDay";

function WeeklyRota() {
  return (
    <div className="flex flex-wrap justify-start print:justify-start gap-y-4">
      <WeekDay day={0} />
      <WeekDay day={1} />
      <WeekDay day={2} />
      <WeekDay day={3} />
      <WeekDay day={4} />
      <WeekDay day={5} />
      <WeekDay day={6} />
    </div>
  );
}

export default WeeklyRota;
