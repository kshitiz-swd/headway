import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ApplicationsByPlatform = ({ data = [] }) => {


  const formattedData = data.map(item => ({
    platform: item._id,
    count: item.count,
  }));

  return (
    <div className="bg-white p-5 rounded-2xl  border-2 border-black shadow-[4px_4px_0_0_#000]">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Applications by Platform
        </h3>
      </div>

      {formattedData.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={formattedData}
            layout="vertical"
            margin={{ left: 20 }}
          >
            <XAxis type="number" hide />

            <YAxis
              dataKey="platform"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
              }}
            />

            <Bar
              dataKey="count"
              fill="#6366F1"
              radius={[0, 6, 6, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default ApplicationsByPlatform;