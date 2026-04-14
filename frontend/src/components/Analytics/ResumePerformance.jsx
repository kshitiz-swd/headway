import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ResumePerformance = ({ data = [] }) => {
  console.log(data);
  

  const formatted = data.map(item => ({
    resume: item.title || "Unknown",
    applications: item.applications,
    interviews: item.interviews,
  }));

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000]">

      <h3 className="font-semibold text-gray-800 mb-4">
        Resume Performance
      </h3>

      {formatted.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={formatted}>
            <XAxis dataKey="resume" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="applications"
              fill="#6366F1"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="interviews"
              fill="#A78BFA"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default ResumePerformance;