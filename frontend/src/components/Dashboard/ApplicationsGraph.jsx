import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getTimelineAnalytics } from "../../api/services";

const ApplicationsGraph = () => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("All Time");
  const [data, setData] = useState([]);

  const rangeMap = {
    "Last 7 Days": "7d",
    "Last 30 Days": "30d",
    "Last 6 Months": "6m",
    "All Time": "all",
  };

  const fetchData = async (rangeKey) => {
    try {
      const res = await getTimelineAnalytics(rangeKey);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData("all");
  }, []);

  const handleSelect = (label) => {
    setSelectedRange(label);
    setDropdownOpen(false);
    fetchData(rangeMap[label]);
  };

  const formatTimelineData = (data, range) => {
    return data.map((item) => {
      let label;

      if (range === "7d" || range === "30d") {
        const date = new Date(item.date);
        label = date.toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
        });
      } else {
        const [year, month] = item.date.split("-");
        label = new Date(year, month - 1).toLocaleString("default", {
          month: "short",
        });
      }

      return {
        label,
        applications: item.count,
      };
    });
  };

  const currentRangeKey = rangeMap[selectedRange];

  const formattedData = formatTimelineData(data, currentRangeKey);

  if (!formattedData.length) {
    return <p className="text-center py-10 text-gray-400">No data</p>;
  }


  return (
    <div className="rounded-xl bg-white border-3 border-black flex flex-col gap-4 shadow-[8px_8px_0_0_#000]">
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Applications Overview
          </h2>
          <p className="text-xs text-gray-400">
            Track application trends
          </p>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
            onClick={() => setDropdownOpen(!dropDownOpen)}
          >
            {selectedRange}
            {dropDownOpen ? (
              <FiChevronUp size={14} />
            ) : (
              <FiChevronDown size={14} />
            )}
          </button>

          {dropDownOpen && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              {Object.keys(rangeMap).map((label) => (
                <div
                  key={label}
                  onClick={() => handleSelect(label)}
                  className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 pr-6">
        {formattedData.length === 0 ? (
          <div className="flex justify-center items-center h-[280px] text-gray-400">
            No data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={formattedData}>
              <defs>
                <linearGradient
                  id="applicationsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
                formatter={(value) => [
                  `${value} applications`,
                  "Applications",
                ]}
              />

              <Area
                type="monotone"
                dataKey="applications"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#applicationsGradient)"
                dot={{ r: 2 }}
                strokeLinecap="round"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ApplicationsGraph;