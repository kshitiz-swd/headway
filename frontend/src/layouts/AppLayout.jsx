import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import AddApplication from "../components/AddApplication";
import AddResume from "../components/Resume/AddResume";

function AppLayout({ user, setUser }) {
  const [isAddApplicationOpen, setIsAddApplicationOpen] = useState(false);
  const [isAddResumeOpen, setIsAddResumeOpen] = useState(false);

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
              openAddApplicationModal: () => setIsAddApplicationOpen(true),
              openAddResumeModal: () => setIsAddResumeOpen(true),
            }}
          />
        </main>

      </div>

      <Modal
        isOpen={isAddApplicationOpen}
        onClose={() => setIsAddApplicationOpen(false)}
      >
        <AddApplication
          onClose={() => setIsAddApplicationOpen(false)}
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