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

  const formatted = data.map(item => ({
    date: item._id,
    count: item.count,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Applications Over Time
        </h3>
      </div>

      {formatted.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
          No timeline data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={formatted}>

            <defs>
              <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366F1"
              strokeWidth={2}
              fill="url(#colorApplications)"
              dot={{ r: 3 }}
            />

          </AreaChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default TimelineChart;