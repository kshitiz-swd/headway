import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const TimelineChart = ({ data = [] }) => {

  const formatted = data
    .filter(item => item?.date)
    .map(item => {
      const [year, month] = item.date.split("-");

      return {
        date: new Date(year, month - 1).toLocaleString("default", {
          month: "short",
        }),
        count: item.count,
      };
    });

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000]">

      <h3 className="font-semibold text-gray-800 mb-4">
        Applications Over Time
      </h3>

      {formatted.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400">
          No timeline data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={formatted}>
            <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TimelineChart;