
import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { MentorContext } from "../Context/MentorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { mToken,
      setMToken,} = useContext(MentorContext)

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if(mToken) {
      setMToken("");
      localStorage.removeItem("mToken")
    }

  };

  return (
    <nav className="bg-white border-b px-4 sm:px-6 lg:px-10 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold cursor-pointer truncate">
          Programmer-Academy
        </h1>
        <span className="text-xs px-2.5 py-0.5 rounded-full border border-gray-500 text-gray-600 whitespace-nowrap">
          {aToken ? "Admin" : "Mentor"}
        </span>
      </div>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 cursor-pointer rounded-full transition w-full sm:w-auto"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
