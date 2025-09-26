import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../Context/AdminContext";
import { MentorContext } from "../Context/MentorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { mToken } = useContext(MentorContext);

  // Admin links
  const adminLinks = [
    { name: "Dashboard", to: "/admin-dashboard", icon: assets.home_icon },
    { name: "Enrollments", to: "/all-enrollments", icon: assets.appointment_icon },
    { name: "Add Course", to: "/add-course", icon: assets.add_icon },
    { name: "Course List", to: "/course-list", icon: assets.people_icon },
  ];

  // Mentor links
  const mentorLinks = [
    { name: "Dashboard", to: "/mentor-dashboard", icon: assets.home_icon },
    { name: "Enrollments", to: "/mentor-enrollments", icon: assets.appointment_icon },
    { name: "Profile", to: "/mentor-profile", icon: assets.people_icon },
  ];

  // Choose which links to render
  const links = aToken ? adminLinks : mToken ? mentorLinks : [];

  return (
    <div className="flex flex-col h-[12000px] md:h-[2500px] bg-white border-r w-20 sm:w-28 md:w-48 transition-all">
      {(aToken || mToken) && (
        <ul className="flex flex-col mt-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 sm:px-4 md:px-6 w-full cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f2f3ff] border-r-4 border-primary-600"
                    : "hover:bg-gray-100"
                }`
              }
            >
              <img src={link.icon} className="w-5 sm:w-6 md:w-6" alt={link.name} />
              {/* Show text only on sm and above */}
              <span className="text-xs sm:text-sm md:text-base font-medium hidden sm:block">
                {link.name}
              </span>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
