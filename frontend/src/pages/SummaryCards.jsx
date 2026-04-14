const SummaryCards = ({ summary }) => {

  if (!summary) {
    return (
      <div className="grid grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse h-24" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Applications",
      value: summary.totalApplications,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Interviews",
      value: `${summary.interviews} (${summary.interviewRate}%)`,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Offers",
      value: `${summary.offers} (${summary.offerRate}%)`,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Rejections",
      value: summary.rejections,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">
            {card.title}
          </p>

          <div className="flex items-center justify-between mt-2">
            <h3 className={`text-2xl font-semibold ${card.color}`}>
              {card.value}
            </h3>

            <div className={`w-10 h-10 rounded-lg ${card.bg}`} />
          </div>
        </div>
      ))}

    </div>
  );
};

export default SummaryCards;