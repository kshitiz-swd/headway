import { useEffect, useState } from 'react'
import Infocards from '../components/Dashboard/Infocards'
import ApplicationsGraph from '../components/Dashboard/ApplicationsGraph'
import ApplicationStatus from '../components/Dashboard/ApplicationStatus'
import { IoMdAdd } from 'react-icons/io'
import { IoIosTrendingUp } from "react-icons/io"
import { IoMdPeople, IoMdRibbon, IoMdCloseCircle } from "react-icons/io"
import { useOutletContext } from 'react-router-dom'
import { getInsights, getStatusAnalytics } from '../api/services'
import DashboardSkeleton from '../components/skeletons/DashboardSkeleton'

const Dashboard = () => {
  const { openAddApplicationModal, openAddResumeModal, applications } = useOutletContext()

  const [insights, setInsights] = useState({})
  const [statusData, setStatusData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!applications) return;

    if (applications.length === 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [insightsRes, statusRes] = await Promise.all([
          getInsights(),
          getStatusAnalytics()
        ]);

        setInsights(insightsRes.data);
        setStatusData(statusRes.data.data);

      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [applications]);

  if (loading) return <DashboardSkeleton />

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8 h-screen rounded-xl">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">
            Track your applications and insights
          </p>
        </div>

        <div className="flex items-center gap-6">

          <button
            onClick={openAddApplicationModal}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-2 hover:opacity-90 transition"
          >
            <IoMdAdd size={18} />
            Add Application
          </button>

          <button
            onClick={openAddResumeModal}
            className="text-black px-4 py-2 rounded-lg bg-white border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-2 hover:opacity-90 transition"
          >
            Upload Resume
          </button>

        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <Infocards
          value={insights.applications?.value || 0}
          change={insights.applications?.change || 0}
          title="Applications"
          icon={<IoIosTrendingUp size={18} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <Infocards
          value={insights.interviews?.value || 0}
          change={insights.interviews?.change || 0}
          title="Interviews"
          icon={<IoMdPeople size={18} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <Infocards
          value={insights.offers?.value || 0}
          change={insights.offers?.change || 0}
          title="Offers"
          icon={<IoMdRibbon size={18} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <Infocards
          value={insights.rejections?.value || 0}
          change={insights.rejections?.change || 0}
          title="Rejections"
          icon={<IoMdCloseCircle size={18} />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-2 bg-white">
          <ApplicationsGraph />
        </div>

        <div className="bg-white col-span-2">
          <ApplicationStatus data={statusData} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-indigo-800 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">AI Insights</h3>

          <div className="mt-2 space-y-2 text-sm opacity-90">

            {insights.insights?.length > 0 ? (
              insights.insights.map((item, i) => (
                <p key={i}>• {item}</p>
              ))
            ) : (
              <p>No insights available yet.</p>
            )}

            {insights.suggestions?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-white/90">Suggestions:</p>
                <ul className="list-disc ml-5 mt-1">
                  {insights.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          <div className="mt-4 flex gap-6 text-xs opacity-80">

            <span>
              Interview Rate: {insights.interviewRate}%
            </span>

            <span>
              Offer Rate: {insights.offerRate}%
            </span>

            {insights.bestPlatform && (
              <span>
                Best Platform: {insights.bestPlatform}
              </span>
            )}

          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard