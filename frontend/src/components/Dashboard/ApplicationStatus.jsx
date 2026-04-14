import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const pipelineColours = [
  "#6366F1",
  "#A78BFA",
  "#FBBF24",
  "#34D399",
  "#EF4444",
]

const ApplicationStatus = ({ data = [] }) => {

  const pipelineData = data.map(item => ({
    status: item.status,
    value: item.count
  }));
  

  const totalApp = pipelineData.reduce((sum, entry) => sum + entry.value, 0);

  if (!pipelineData.length) {
    return <p className="text-center py-10 text-gray-400">No data available</p>;
  }

  return (
    <div className=" rounded-xl bg-white  border-3 border-black flex flex-col gap-4 shadow-[8px_8px_0_0_#000]  ">

      <div className="px-6 py-4 border-b border-gray-100 h-19">
        <h2 className="text-lg font-semibold text-gray-800">Pipeline Snapshot</h2>
      </div>

      <div className='flex gap-4 w-full'>

        <div className='w-1/2'>
          <ResponsiveContainer width="100%" height={312}>
            <PieChart>
              <Pie
                data={pipelineData}
                dataKey="value"
                nameKey="status"
                innerRadius={100}
                outerRadius={140}
                cornerRadius={8}
                
              >
                {pipelineData.map((entry, index) => (
                  <Cell
                    key={entry.status}
                    fill={pipelineColours[index % pipelineColours.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                <tspan className="text-2xl font-semibold fill-gray-800">
                  {totalApp}
                </tspan>
                <tspan x="50%" dy="18" className="text-xs fill-gray-400">
                  Applications
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='w-1/2 flex flex-col gap-3 justify-center px-8'>
          {pipelineData.map((entry, index) => (
            <div key={entry.status} className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ backgroundColor: pipelineColours[index % pipelineColours.length] }}
                />
                <span className='text-gray-600'>{entry.status}</span>
              </div>
              <span className='font-medium text-gray-800'>{entry.value}</span>
            </div>
          ))}
        </div>

      </div>


    </div>
  )
}

export default ApplicationStatus