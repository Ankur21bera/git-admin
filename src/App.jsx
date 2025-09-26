

import React, { useContext } from "react";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import { AdminContext } from "./Context/AdminContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import Allenrollment from "./Pages/Admin/Allenrollment";
import Addcourse from "./Pages/Admin/Addcourse";
import Courselist from "./Pages/Admin/Courselist";
import { MentorContext } from "./Context/MentorContext";
import Mentordashboard from "./Pages/Mentor/Mentordashboard";
import Mentorenrollment from "./Pages/Mentor/Mentorenrollment";
import Mentorprofile from "./Pages/Mentor/Mentorprofile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { mToken } = useContext(MentorContext);

  // ✅ check if either admin or mentor is logged in
  const isAuthenticated = aToken || mToken;

  return isAuthenticated ? (
    <div className="bg-[#f8f9fd] min-h-screen">
      <Toaster />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-enrollments" element={<Allenrollment />} />
            <Route path="/add-course" element={<Addcourse />} />
            <Route path="/course-list" element={<Courselist />} />

            <Route path="/mentor-dashboard" element={<Mentordashboard/>}/>
            <Route path="/mentor-enrollments" element={<Mentorenrollment/>}/>
            <Route path="/mentor-profile" element={<Mentorprofile/>}/>
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <Toaster />
    </>
  );
};

export default App;
