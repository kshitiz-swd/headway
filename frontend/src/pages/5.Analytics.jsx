import React, { useEffect, useState } from "react";
import {
  getStatusAnalytics,
  getPlatformAnalytics,
  getTimelineAnalytics,
  getResumeAnalytics,
} from "../api/services";

import ApplicationsByPlatform from "../components/Analytics/ApplicationsByPlatform";
import ResumePerformance from "../components/Analytics/ResumePerformance";
import TimelineChart from "../components/Analytics/TimelineCharts";
import KeyObservations from "../components/Analytics/KeyObservations";
import StatusOverview from "../components/Analytics/StatusOverview";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [platformData, setPlatformData] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [platformRes, resumeRes, statusRes, timelineRes] =
          await Promise.all([
            getPlatformAnalytics(),
            getResumeAnalytics(),
            getStatusAnalytics(),
            getTimelineAnalytics(),
          ]);

        setPlatformData(platformRes.data?.data || []);
        setResumeData(resumeRes.data?.data || []);
        setStatusData(statusRes.data?.data || []);
        setTimelineData(timelineRes.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-400">Loading analytics...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-8 bg-[#F8FAFC] min-h-screen">

      <div>
        <h2 className="text-3xl font-semibold text-gray-900">
          Analytics
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Understand your job search performance
        </p>
      </div>

      <TimelineChart data={timelineData} />

      <StatusOverview data={statusData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ApplicationsByPlatform data={platformData} />
        <ResumePerformance data={resumeData} />
      </div>

      <KeyObservations
        platformData={platformData}
        resumeData={resumeData}
      />

    </div>
  );
};

export default Analytics;