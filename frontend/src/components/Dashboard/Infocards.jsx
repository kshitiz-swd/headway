import React from 'react'

const Infocards = ({ value = 0, title = "Title", change = 0, icon, iconBg, iconColor }) => {

    const isPositive = Number(change) >= 0;

    return (
        <div className='p-5 rounded-xl bg-white border-3 border-black flex flex-col gap-4 shadow-[6px_6px_0_0_#000]'>

            <div className='flex justify-between'>
                <h3 className='text-sm text-gray-500 font-medium'>
                    {title}
                </h3>

                <div className={`flex rounded-lg items-center justify-center w-9 h-9 ${iconBg}`}>
                    <div className={iconColor}>
                        {icon}
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-end'>
                <p className='text-3xl font-semibold text-gray-800'>
                    {value}
                </p>

                <div className={`px-2 py-1 rounded-md flex gap-1 items-center text-xs font-medium ${isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    }`}>

                    <span>
                        {isPositive ? "↗" : "↘"}
                    </span>

                    <span>
                        {isPositive ? `+${change}%` : `${change}%`}
                    </span>
                </div>
            </div>

            <p className='text-xs text-gray-400'>
                vs last month
            </p>
        </div>
    )
}

export default Infocards