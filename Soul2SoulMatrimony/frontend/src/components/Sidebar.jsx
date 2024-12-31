import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBook, FaBed, FaCalendar, FaFile, FaPersonBooth, FaMale, FaPlus, FaCog, FaUsers } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import logo from "../assets/s2smLogo.png";
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [screenSize, setScreenSize] = useState("large");
  const location = useLocation();
  const { userData }  = useUser();
  const { logout } = useAuth();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("large");
        setIsOpen(true);
      } else if (window.innerWidth >= 768) {
        setScreenSize("medium");
        setIsOpen(false);
      } else {
        setScreenSize("small");
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  const Logout = () => {
    logout();
  };

  const menuItems = 
  userData.role === "admin"
  ? [
    { icon: <FaHome />, label: "Dashboard", location: "/admin/dashboard" },
    { icon: <FaFile />, label: "Matrimony Profiles", location: "/admin/profiles" },
    { icon: <FaUsers />, label: "Employees", location: "/admin/employee-management" },
    // { icon: <FaCog />, label: "Settings", location: "/admin/settings" },
  ]
  : [
    { icon: <FaHome />, label: "Dashboard", location: "/employee/dashboard" },
    { icon: <FaPlus />, label: "Create Profile", location: "/employee/create-profile" },
    { icon: <FaFile />, label: "Search Profile", location: "/employee/profiles" },
    // { icon: <FaCog />, label: "Settings", location: "/employee/settings" },
  ];
  

  const variants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 z-50 h-full p-6 text-[#335064] bg-white shadow-lg ${
          screenSize === "large" ? "w-64" : "w-64 lg:w-auto lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 mb-8">
          <img
            loading="lazy"
            src={logo}
            alt="logo"
            className="object-contain w-auto h-10"
          />
          {screenSize !== "large" && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 transition-colors duration-300 hover:text-gray-700 lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.location;
            return (
              <motion.li
                key={item.label}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.location}
                  className={`flex items-center p-3 space-x-4 transition-all duration-300 rounded-lg ${
                    isActive
                      ? "bg-[#ff0000] text-white shadow-md"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span
                    className={`text-2xl ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`font-medium ${isActive ? "font-semibold" : ""}`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute right-0 w-1 h-8 bg-white rounded-l-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <div className="absolute flex flex-col items-center justify-center text-center bottom-6 left-6 right-6">
          <hr className="w-full mb-4 border-gray-300" />
          <div>
            <p className="text-md">&copy; Soul 2 Soul Matrimony</p>
            <p className="font-bold text-sm">All Rights Reserved</p>
          </div>
        </div>
      </motion.nav>
      {screenSize !== "large" && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-4 left-4 z-40 text-gray-800 bg-white p-2 rounded-md shadow-lg hover:bg-gray-100 transition-all duration-300 lg:hidden ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default SideBar;
