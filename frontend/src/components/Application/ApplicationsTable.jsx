import { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useOutletContext } from "react-router-dom";
import { deleteApplication } from "../../api/services";

const ApplicationsTable = ({ applications }) => {
    const { openEditApplicationModal, setApplications } = useOutletContext();

    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

    const statusStyles = {
        Applied: "bg-blue-50 text-blue-600",
        Interviewing: "bg-yellow-50 text-yellow-600",
        Offered: "bg-green-50 text-green-600",
        Rejected: "bg-red-50 text-red-600",
    };

    const tableHeaders = [
        "Company",
        "Role",
        "Platform",
        "Resume",
        "Status",
        "Date",
    ];

    const allSelected =
        selectedRows.length === applications.length && applications.length > 0;

    const isIndeterminate =
        selectedRows.length > 0 && !allSelected;

    const handleSelectAll = () => {
        setSelectedRows(
            allSelected ? [] : applications.map(app => app._id)
        );
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        try {
            await deleteApplication(id);

            setApplications(prev =>
                prev.filter(app => app._id !== id)
            );
        } catch (err) {
            console.error(err);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedRows.length === 0) return;

        const confirmDelete = window.confirm("Delete selected applications?");
        if (!confirmDelete) return;

        try {
            await Promise.allSettled(
                selectedRows.map(id => deleteApplication(id))
            );

            setApplications(prev =>
                prev.filter(app => !selectedRows.includes(app._id))
            );

            setSelectedRows([]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const handleClickOutside = () => setOpenMenuId(null);
        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    if (applications.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                No applications yet 🚀
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {selectedRows.length > 0 && (
                <div className="flex justify-end">
                    <button
                        onClick={handleBulkDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:opacity-90 transition"
                    >
                        Delete Selected ({selectedRows.length})
                    </button>
                </div>
            )}

            <div className="rounded-lg overflow-visible border-2 border-black">

                <table className="w-full text-sm">

                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={allSelected}
                                    ref={(el) => el && (el.indeterminate = isIndeterminate)}
                                    onChange={handleSelectAll}
                                />
                            </th>

                            {tableHeaders.map(header => (
                                <th key={header} className="p-4 text-left font-medium text-gray-500">
                                    {header}
                                </th>
                            ))}

                            <th className="p-4"></th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">

                        {applications.map((app) => (
                            <tr
                                key={app._id}
                                className={`border-b border-gray-100 hover:bg-gray-50 ${selectedRows.includes(app._id) ? "bg-gray-50" : ""
                                    }`}
                            >

                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(app._id)}
                                        onChange={() => handleSelectRow(app._id)}
                                    />
                                </td>

                                <td className="p-4 font-medium text-gray-800">
                                    {app.companyName}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {app.role}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {app.platform}
                                </td>

                                <td className="p-4 text-gray-600">
                                    {app.resume?.title || "-"}
                                </td>

                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[app.status]}`}>
                                        {app.status}
                                    </span>
                                </td>

                                <td className="p-4 text-gray-500">
                                    {new Date(app.applicationDate).toLocaleDateString()}
                                </td>

                                <td className="p-4 relative">

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(openMenuId === app._id ? null : app._id);
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <CiMenuKebab size={18} />
                                    </button>

                                    {openMenuId === app._id && (
                                        <div className="absolute right-0 top-10 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">

                                            <button
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    openEditApplicationModal(app);
                                                    setOpenMenuId(null);
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                                                onClick={() => handleDelete(app._id)}
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    )}

                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApplicationsTable;