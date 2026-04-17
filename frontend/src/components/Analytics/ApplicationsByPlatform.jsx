import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const colors = ["#6366F1", "#A78BFA", "#FBBF24", "#34D399"];

const ApplicationsByPlatform = ({ data = [] }) => {

  const formatted = data.map(item => ({
    platform: item._id,
    count: item.count,
  }));

  console.log(formatted);
  

  return (
    <div className="bg-white p-5 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000]">

      <h3 className="font-semibold text-gray-800 mb-4">
        Applications by Platform
      </h3>

      {formatted.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400">
          No data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250} >
          <BarChart data={formatted} layout="vertical">
            <XAxis type="number"  />
            <YAxis dataKey="platform" type="category" />
            <Tooltip />
            <Bar dataKey="count">
              {formatted.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ApplicationsByPlatform;