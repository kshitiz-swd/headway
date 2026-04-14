const ResumeCard = ({ resume, onDelete }) => {
  return (
    <div className=" p-4  hover:shadow-md transition border-2 rounded-xl shadow-[4px_4px_0_0_#000]">
      <h3 className="text-lg font-semibold">{resume.title}</h3>

      <p className="text-sm text-gray-500 mt-2">
        {resume.description || "No description"}
      </p>

      <div className="flex justify-between items-center mt-4">
        <a
          href={resume.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 text-sm"
        >
          View
        </a>

        <button
          onClick={() => onDelete(resume._id)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;