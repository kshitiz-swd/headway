import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import ApplicationsTable from "../components/Application/ApplicationsTable";
import { IoMdAdd } from "react-icons/io";
import { useOutletContext } from "react-router-dom";
import { getApplications } from "../api/services";
import ApplicationsSkeleton from "../components/skeletons/ApplicationsSkeleton";

const Dropdown = ({ label, value, options, open, onToggle, onSelect }) => {
  return (
    <div className="relative border-2 rounded-lg">
      <button
        onClick={onToggle}
        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm flex items-center justify-between min-w-[150px] hover:bg-gray-50"
      >
        <span className="text-gray-600">
          {label}: <span className="font-medium text-gray-800">{value}</span>
        </span>
        {open ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
      </button>

      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-10">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => onSelect(opt)}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Applications = () => {
  const {
    openAddApplicationModal,
    applications,
    setApplications,
    setEditingApplication,
  } = useOutletContext();

  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [platform, setPlatform] = useState("All");
  const [status, setStatus] = useState("All");
  const [resume, setResume] = useState("All");

  const [openDropDown, setOpenDropDown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const allPlatforms = ["All", "LinkedIn", "Indeed", "Glassdoor", "AngelList", "Other"];
  const allStatus = ["All", "Applied", "Interviewing", "Offered", "Rejected"];

  const allResumes = [
    "All",
    ...new Set(applications.map(app => app.resume?.title).filter(Boolean))
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getApplications();
        setApplications(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    if (applications.length === 0) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [applications, setApplications]);

  useEffect(() => {
    let filtered = [...applications];

    if (platform !== "All") {
      filtered = filtered.filter(app => app.platform === platform);
    }

    if (status !== "All") {
      filtered = filtered.filter(app => app.status === status);
    }

    if (resume !== "All") {
      filtered = filtered.filter(app => app.resume?.title === resume);
    }

    if (searchQuery) {
      filtered = filtered.filter(app =>
        app.companyName.toLowerCase().includes(searchQuery) ||
        app.role.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredApplications(filtered);
  }, [applications, platform, status, resume, searchQuery]);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropDown(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading) return <ApplicationsSkeleton />;

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">Applications</h2>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage your job applications
          </p>
        </div>

        <button
          onClick={openAddApplicationModal}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] flex items-center gap-2 hover:opacity-90 transition"
        >
          <IoMdAdd size={18} />
          Add Application
        </button>
      </div>

      <div className="px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] flex flex-wrap items-center gap-4">

        <div className="flex items-center gap-2 px-3 py-2 w-80 bg-gray-50 border-2 rounded-lg">
          <CiSearch size={18} className="text-gray-400" />
          <input
            className="bg-transparent focus:outline-none w-full text-sm"
            type="text"
            placeholder="Search by role or company"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>

        <Dropdown
          label="Platform"
          value={platform}
          options={allPlatforms}
          open={openDropDown === "platform"}
          onToggle={() => setOpenDropDown(openDropDown === "platform" ? null : "platform")}
          onSelect={(val) => {
            setPlatform(val);
            setOpenDropDown(null);
          }}
        />

        <Dropdown
          label="Status"
          value={status}
          options={allStatus}
          open={openDropDown === "status"}
          onToggle={() => setOpenDropDown(openDropDown === "status" ? null : "status")}
          onSelect={(val) => {
            setStatus(val);
            setOpenDropDown(null);
          }}
        />

        <Dropdown
          label="Resume"
          value={resume}
          options={allResumes}
          open={openDropDown === "resume"}
          onToggle={() => setOpenDropDown(openDropDown === "resume" ? null : "resume")}
          onSelect={(val) => {
            setResume(val);
            setOpenDropDown(null);
          }}
        />

        <div className="ml-auto text-sm text-gray-500">
          {filteredApplications.length} results
        </div>
      </div>

      <div className="border-black shadow-[4px_4px_0_0_#000] rounded-2xl">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No applications found
          </div>
        ) : (
          <ApplicationsTable applications={filteredApplications} />
        )}
      </div>
    </div>
  );
};

export default Applications;