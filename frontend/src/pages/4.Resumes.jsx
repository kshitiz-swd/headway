import { useEffect, useState } from "react";
import { getResumes, deleteResume } from "../api/services";
import ResumeCard from "../components/Resume/ResumeCard";
import AddResumeModal from "../components/Resume/AddResume";
import { IoMdAdd } from "react-icons/io";

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const fetchResumes = async () => {
    try {
      const { data } = await getResumes();
      console.log(data);

      setResumes(data.data);
    } catch (err) {
      console.error("Error fetching resumes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return <p className="p-6">Loading resumes...</p>;

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">My Resumes</h2>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-2 hover:opacity-90 transition"
        >
          <IoMdAdd size={18} />
           Add Resume
        </button>
      </div>


      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 ">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}


      {openModal && (
        <AddResumeModal
          onClose={() => setOpenModal(false)}
          refresh={fetchResumes}
        />
      )}
    </div>
  );
};

export default Resumes;