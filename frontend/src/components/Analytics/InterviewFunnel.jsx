const InterviewFunnel = ({ data = [] }) => {

  const counts = {};

  data.forEach(item => {
    counts[item._id] = item.count;
  });

  const stages = ["Applied", "Interviewing", "Offered"];
  const max = counts["Applied"] || 1;

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0_0_#000]">

      <h3 className="font-semibold text-gray-800 mb-6">
        Interview Funnel
      </h3>

      <div className="space-y-6">

        {stages.map((stage, index) => {
          const value = counts[stage] || 0;
          const width = (value / max) * 100;

          const prev =
            index === 0 ? null : counts[stages[index - 1]];

          const conversion =
            prev && prev > 0
              ? Math.round((value / prev) * 100)
              : null;

          return (
            <div key={stage}>

              <div
                className="bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg flex justify-between items-center transition "
                style={{ width: `${width}%` }}
              >
                <span className="font-medium">{stage}</span>
                <span className="font-semibold">{value}</span>
              </div>

              {conversion !== null && (
                <p className="text-xs text-gray-500 mt-1 ml-2">
                  {conversion}% conversion
                </p>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default InterviewFunnel;