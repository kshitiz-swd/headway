import { useState } from "react";
import { createResume } from "../../api/services";

const AddResumeModal = ({ onClose }) => {
  const [form, setForm] = useState({
    title: "",
    fileUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.fileUrl) return;

    try {
      setLoading(true);
      await createResume(form);
      onClose();
    } catch (err) {
      console.error("Create failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Add Resume</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
          />

          <input
            name="fileUrl"
            value={form.fileUrl}
            onChange={handleChange}
            placeholder="File URL"
            className="border p-2 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-500 text-white text-center px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-black px-4 py-2 rounded-lg bg-white border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition"
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddResumeModal;