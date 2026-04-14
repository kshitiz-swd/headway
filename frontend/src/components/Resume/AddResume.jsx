import { useState } from "react";
import { createResume } from "../../api/services";

const AddResumeModal = ({ onClose, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    fileUrl: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResume(form);
      refresh();
      onClose();
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add Resume</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Title"
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="File URL"
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, fileUrl: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="border p-2 rounded"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-500 text-white text-center px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className=" text-black px-4 py-2 rounded-lg bg-white  border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResumeModal;