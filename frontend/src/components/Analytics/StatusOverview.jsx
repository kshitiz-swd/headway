import React from "react";

const StatusOverview = ({ data = [] }) => {

  const counts = {};

  data.forEach(item => {
    counts[item.status] = item.count;
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const stages = ["Applied", "Interviewing", "Offered", "Rejected"];

  const colors = {
    Applied: "bg-blue-300 text-blue-700",
    Interviewing: "bg-yellow-300 text-yellow-700",
    Offered: "bg-green-300 text-green-700",
    Rejected: "bg-red-300 text-red-700",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000]">

      <h3 className="font-semibold text-gray-800 mb-6">
        Application Status Breakdown
      </h3>

      <div className="space-y-4">

        {stages.map(stage => {
          const value = counts[stage] || 0;
          const percentage = total ? ((value / total) * 100).toFixed(1) : 0;

          return (
            <div key={stage}>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{stage}</span>
                <span className="text-gray-500">{value}</span>
              </div>

              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${colors[stage]}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default StatusOverview;