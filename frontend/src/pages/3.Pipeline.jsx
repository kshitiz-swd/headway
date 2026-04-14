import React, { useEffect, useState } from "react";
import { getPipeline, updateApplicationStatus } from "../api/services";
import PipelineCard from '../components/Pipeline/PipelineCard'

const Pipeline = () => {

  const columnColors = {
    Applied: "bg-blue-50",
    Interviewing: "bg-yellow-50",
    Offered: "bg-green-50",
    Rejected: "bg-red-50",
  };

  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [draggedApplication, setDraggedApplication] = useState(null);


  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const res = await getPipeline();
        console.log(res.data.data);


        const formatted = {};

        Object.entries(res.data.data).forEach(([status, apps]) => {
          formatted[status] = {
            name: status,
            applications: apps,
          };
        });
        console.log(formatted);



        setColumns(formatted);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPipeline();
  }, []);


  const handleDragStart = (columnId, application) => {
    setDraggedApplication({ columnId, application });
  };

  const handleDragOver = (e) => e.preventDefault();


  const handleDrop = async (e, destinationColumnId) => {
    e.preventDefault();

    if (!draggedApplication) return;

    const { columnId: sourceColumnId, application } = draggedApplication;

    if (sourceColumnId === destinationColumnId) return;

    try {
      await updateApplicationStatus(application._id, destinationColumnId);

      setColumns(prev => {
        const sourceApps = prev[sourceColumnId].applications;
        const destApps = prev[destinationColumnId].applications;

        return {
          ...prev,

          [sourceColumnId]: {
            ...prev[sourceColumnId],
            applications: sourceApps.filter(app => app._id !== application._id),
          },

          [destinationColumnId]: {
            ...prev[destinationColumnId],
            applications: [...destApps, application],
          },
        };
      });

    } catch (err) {
      console.error(err);
    }

    setDraggedApplication(null);
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-400">Loading pipeline...</p>;
  }

  return (
    <div className="p-6 space-y-6">


      <div>
        <h2 className="text-3xl font-semibold text-gray-800">Pipeline</h2>
        <p className="text-gray-500 text-sm mt-1">
          Drag and manage your applications
        </p>
      </div>


      <div className="flex gap-8 overflow-x-auto pb-4">

        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className={` border border-2 rounded-2xl shadow-[6px_6px_0_0_#000] min-w-[360px] flex flex-col ${columnColors[column.name]}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >


            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-700">
                {column.name}
              </h3>
              <span className="text-sm text-gray-400">
                {column.applications.length}
              </span>
            </div>


            <div className="flex flex-col gap-3 px-4 min-h-[800px]">

              {column.applications.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-6">
                  Drop here
                </div>
              ) : (
                column.applications.map(app => (
                  <PipelineCard
                    key={app._id}
                    application={app}
                    columnId={columnId}
                    handleDragStart={handleDragStart}
                  />
                ))
              )}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Pipeline;