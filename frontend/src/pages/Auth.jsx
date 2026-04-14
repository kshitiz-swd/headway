import React, { useState } from "react";
import { getUser, loginUser, signUp } from "../api/services";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const DEMO_USER = {
    email: "kshitiz@gmail.com",
    password: "shitij123",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await loginUser({ email, password });
      } else {
        await signUp({ name, email, password });
      }

      const res = await getUser();
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);

    try {
      await loginUser(DEMO_USER);

      const res = await getUser();
      setUser(res.data.user);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Demo login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 ">
      <div className="w-full max-w-md">


        <div className="text-center mb-8">
          <div className="h-12 w-12 mx-auto bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg">
            JT
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-3">
            JobTracker
          </h1>
          <p className="text-sm text-gray-500">
            Track your job applications easily
          </p>
        </div>

  
        <div className="bg-white p-6 space-y-6 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000]">


          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? "Login to continue"
                : "Start tracking your job applications"}
            </p>
          </div>


          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full hover:bg-gray-50 transition text-sm font-medium  text-black px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000] "
            >
              🚀 Try Demo Account
            </button>
            <p className="text-xs text-gray-400 text-center">
              No signup required. Explore instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            

            <button
              type="submit"
              disabled={isLoading}
              className="w-full hover:opacity-90 transition font-medium bg-indigo-500 text-white px-4 py-2 rounded-lg  border-2 border-black shadow-[4px_4px_0_0_#000] "
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-black font-medium hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          Built for recruiters to explore easily 🚀
        </p>
      </div>
    </div>
  );
};

export default Auth;