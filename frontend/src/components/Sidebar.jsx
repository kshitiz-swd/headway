import { NavLink, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiBriefcase,
    FiGitBranch,
    FiBarChart2,
    FiFileText,
    FiZap,
    FiSettings,
    FiLogOut
} from "react-icons/fi";
import { logout } from "../api/services";
import Avatar from "./Avatar";

const Sidebar = ({ user, setUser }) => {
    const navigate = useNavigate();

    const itemBase =
        "flex items-center px-4 py-3 rounded-xl transition-all duration-200";

    const active =
        "bg-indigo-500 text-white px-4 py-2 rounded-lg border-2 border-black shadow-[6px_6px_0_0_#000]";

    const inactive =
        "text-gray-400 hover:text-gray-700 hover:bg-gray-100 hover:translate-x-1";

    const handleLogOut = async () => {
        try {
            await logout();
            setUser(null);
            navigate("/auth");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <aside className="h-screen bg-[#F8FAFC] flex flex-col justify-between">

            <div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-500">
                        Headway
                    </h1>
                </div>

                <nav className="px-4 flex flex-col gap-3">

                    <NavLink to="/" end>
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiHome className="w-5 h-5 mr-3" />
                                <span>Dashboard</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/applications">
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiBriefcase className="w-5 h-5 mr-3" />
                                <span>Applications</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/pipeline">
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiGitBranch className="w-5 h-5 mr-3" />
                                <span>Pipeline</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/analytics">
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiBarChart2 className="w-5 h-5 mr-3" />
                                <span>Analytics</span>
                            </div>
                        )}
                    </NavLink>

                    <NavLink to="/resumes">
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiFileText className="w-5 h-5 mr-3" />
                                <span>Resumes</span>
                            </div>
                        )}
                    </NavLink>

                    {/* <NavLink to="/ai-insight">
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiZap className="w-5 h-5 mr-3" />
                                <span>AI Insight</span>
                            </div>
                        )}
                    </NavLink> */}

                    <NavLink to="/settings">
                        {({ isActive }) => (
                            <div className={`${itemBase} ${isActive ? active : inactive}`}>
                                <FiSettings className="w-5 h-5 mr-3" />
                                <span>Settings</span>
                            </div>
                        )}
                    </NavLink>

                </nav>
            </div>

            <div className="p-4 border-t border-gray-200 space-y-3">

                <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-gray-100">
                    <span className="text-xs text-gray-500">Welcome back</span>
                    <div className="flex gap-4 items-center">
                        <Avatar name={user?.name} />
                        <span className="text-sm font-medium text-gray-800">
                            {user?.name || "User"}
                        </span>
                    </div>
                </div>

                <div
                    onClick={handleLogOut}
                    className={`${itemBase} ${inactive} cursor-pointer`}
                >
                    <FiLogOut className="w-5 h-5 mr-3 opacity-60" />
                    <span>Logout</span>
                </div>

            </div>
        </aside>
    );
};

export default Sidebar;