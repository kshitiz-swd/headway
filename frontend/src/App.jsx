import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/1.Dashboard"
import Applications from "./pages/2.Applications"
import AppLayout from "./layouts/AppLayout"
import Pipeline from "./pages/3.Pipeline"
import Resumes from "./pages/4.Resumes"
import Analytics from "./pages/5.Analytics"
import Auth from "./pages/Auth"
import { useEffect, useState } from "react"
import { getUser } from './api/services'
import Settings from "./pages/7.Settings"

function App() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await getUser()
        setUser(res.data.user)

      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser()
  }, [])

  const DotLoader = () => {
    return (
      <div className="flex items-center justify-center gap-2 h-screen">

        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>

        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>

        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>

      </div>
    );
  };


  if (loading) return <DotLoader />;

  return (

    <BrowserRouter>
      <Routes>

        <Route
          path="/auth"
          element={user ? <Navigate to="/" /> : <Auth setUser={setUser} />}
        />

        <Route
          element={user ? <AppLayout user={user} setUser={setUser} /> : <Navigate to="/auth" />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>

  )
}

export default App