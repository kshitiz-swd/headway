
import { useEffect, useState } from "react";
import {
    getUser,
    updateProfile,
    changePassword,
    deleteAccount,
} from "../api/services";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
    const { setUser } = useOutletContext();

    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [deletePassword, setDeletePassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUser();
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setLoading(false);
        };

        fetchUser();
    }, []);

    const handleProfileUpdate = async () => {
        try {
            const res = await updateProfile({ name, email });
            setUser(res.data.data);
            alert("Profile updated");
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    const handlePasswordChange = async () => {
        try {
            await changePassword({ currentPassword, newPassword });
            setCurrentPassword("");
            setNewPassword("");
            alert("Password updated");
        } catch (err) {
            console.error(err);
            alert("Password update failed");
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmDelete) return;

        try {
            await deleteAccount({ password: deletePassword });

            alert("Account deleted");
            window.location.href = "/auth";

        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Delete failed");
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 space-y-8 bg-[#F8FAFC] min-h-screen">

            <div>
                <h2 className="text-3xl font-semibold text-gray-900">
                    Settings
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Manage your account
                </p>
            </div>

            <div className="bg-white p-6 rounded-xl border space-y-4 border-black shadow-[6px_6px_0_0_#000] ">
                <h3 className="text-lg font-semibold">Profile</h3>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    placeholder="Name"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                    placeholder="Email"
                />

                <button
                    onClick={handleProfileUpdate}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000]"
                >
                    Save Changes
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl border space-y-4 border-black shadow-[6px_6px_0_0_#000] ">
                <h3 className="text-lg font-semibold">Change Password</h3>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />

                <button
                    onClick={handlePasswordChange}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000]"
                >
                    Update Password
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl border space-y-4 border-black shadow-[6px_6px_0_0_#000] ">
                <h3 className="text-lg font-semibold text-red-600">
                    Danger Zone
                </h3>

                <p className="text-sm text-gray-500">
                    This action cannot be undone.
                </p>

                <input
                    type="password"
                    placeholder="Enter password to confirm"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                />

                <button
                    onClick={handleDeleteAccount}
                    className="bg-red-600 text-white px-4 py-2  hover:bg-red-700 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000]"
                >
                    Delete Account
                </button>
            </div>

        </div>
    );
};

export default Settings;