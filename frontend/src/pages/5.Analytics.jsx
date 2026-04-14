import React, { useEffect, useState } from "react";
import {
  getStatusAnalytics,
  getPlatformAnalytics,
  getTimelineAnalytics,
  getResumeAnalytics,
} from "../api/services";

import ApplicationsByPlatform from "../components/Analytics/ApplicationsByPlatform";
import ResumePerformance from "../components/Analytics/ResumePerformance";
import InterviewFunnel from "../components/Analytics/InterviewFunnel";
import TimelineChart from "../components/Analytics/TimelineCharts";
import KeyObservations from "../components/Analytics/KeyObservations";

const Analytics = () => {
  const [loading, setLoading] = useState(true);

  const [platformData, setPlatformData] = useState([]);
  const [resumeData, setResumeData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  console.log(resumeData);
  

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          platformRes,
          resumeRes,
          statusRes,
          timelineRes,
        ] = await Promise.all([
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
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);


  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-40 bg-gray-200 rounded"></div>

          <div className="h-64 bg-gray-200 rounded"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>

          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-[#F8FAFC] min-h-screen">


      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Analytics
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Track your job search performance and improve your strategy
          </p>
        </div>
      </div>

      {/* 🔥 TIMELINE (Primary Focus) */}
      <TimelineChart data={timelineData || []} />



      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ApplicationsByPlatform data={platformData || []} />
        <ResumePerformance data={resumeData || []} />
      </div>

      <InterviewFunnel data={statusData || []} />

      <KeyObservations
        platformData={platformData}
        resumeData={resumeData}
      />

    </div>
  );
};

export default Analytics;