const PipelineCard = ({ application, columnId, handleDragStart }) => {
  return (
    <div
      draggable
      onDragStart={() => handleDragStart(columnId, application)}
      className="bg-white  border-2 rounded-xl shadow-[4px_4px_0_0_#000] p-3 hover:shadow-md cursor-grab active:cursor-grabbing transition"
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-medium text-gray-800">
          {application.companyName}
        </h4>

        <p className="text-sm text-gray-600">
          {application.role}
        </p>
      </div>


      <div className="text-xs text-gray-400 mt-4">
        {application.platform}
      </div>
    </div>
  );
};


export default PipelineCard