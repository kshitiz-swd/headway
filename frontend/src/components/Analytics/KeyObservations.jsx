const KeyObservations = ({ platformData = [], resumeData = [] }) => {

  const topPlatform =
    [...platformData].sort((a, b) => b.count - a.count)[0]?._id;

  const topResume =
    [...resumeData].sort((a, b) => b.applications - a.applications)[0]?.title;
    console.log(resumeData);
    

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">
        Key Insights
      </h3>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="font-medium text-gray-800">
            Best Platform
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Most applications come from{" "}
            <span className="font-semibold">
              {topPlatform || "N/A"}
            </span>.
            Consider focusing here.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <p className="font-medium text-gray-800">
            Best Resume
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold">
              {topResume || "N/A"}
            </span>{" "}
            performs best. Use it more often.
          </p>
        </div>

      </div>
    </div>
  );
};

export default KeyObservations;