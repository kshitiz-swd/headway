import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import AddApplication from "../components/AddApplication";
import AddResume from "../components/Resume/AddResume";
import { getApplications } from "../api/services";

function AppLayout({ user, setUser }) {
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);
  const [isAddResumeOpen, setIsAddResumeOpen] = useState(false);

  const [applications, setApplications] = useState([]);
  const [editingApplication, setEditingApplication] = useState(null);

  const openEditApplicationModal = (app) => {
    setEditingApplication(app);
    setIsAddApplicationOpen(true);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getApplications();
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <div className="grid grid-cols-6 bg-[#F8FAFC] h-screen">
        <div className="col-span-1">
          <Sidebar user={user} setUser={setUser} />
        </div>

        <main className="col-span-5 p-4 overflow-y-auto">
          <Outlet
            context={{
              setUser,
              applications,
              setApplications,
              editingApplication,
              setEditingApplication,
              openAddApplicationModal: () => {
                setEditingApplication(null);
                setIsAddApplicationOpen(true);
              },
              openEditApplicationModal,
              openAddResumeModal: () => setIsAddResumeOpen(true),
            }}
          />
        </main>
      </div>

      <Modal
        isOpen={isAddApplicationOpen}
        onClose={() => {
          setIsAddApplicationOpen(false);
          setEditingApplication(null);
        }}
      >
        <AddApplication
          setApplications={setApplications}
          editingApplication={editingApplication}
          onClose={() => {
            setIsAddApplicationOpen(false);
            setEditingApplication(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isAddResumeOpen}
        onClose={() => setIsAddResumeOpen(false)}
      >
        <AddResume
          onClose={() => setIsAddResumeOpen(false)}
        />
      </Modal>
    </>
  );
}

export default AppLayout;