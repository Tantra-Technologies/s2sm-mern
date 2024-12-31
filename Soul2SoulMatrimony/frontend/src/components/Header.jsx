// import React, { useState, useEffect } from "react";
// import { FaSun, FaMoon, FaCog, FaTimes } from "react-icons/fa";
// import { BsSunset } from "react-icons/bs";
// import profile from "../assets/profile.png";
// import notifications from "../assets/notifications.png";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";
// import axiosInstance from "../utils/axiosConfig";

// const process = import.meta.env;

// function Header({ title }) {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
//   const [isSettingsPopupVisible, setSettingsPopupVisible] = useState(false);
//   const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const {logout} = useAuth();
//   const { userData } = useUser();
//   const navigate = useNavigate();
//   const [isEditing, setIsEditing] = useState(false);


//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatDate = (date) => {
//     const options = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return date.toLocaleDateString("en-IN", options);
//   };

//   const getTimeIcon = () => {
//     const hour = currentTime.getHours();
//     if (hour >= 6 && hour < 17) {
//       return <FaSun className="text-yellow-500" />;
//     } else if (hour >= 17 && hour < 20) {
//       return <BsSunset className="text-orange-500" />;
//     } else {
//       return <FaMoon className="text-blue-300" />;
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await axiosInstance.get("/auth/logout");
//       if(response.data.success){
//         logout();
//       } else {
//         alert("Error Logging Out");
//       }
//     } catch (error) {
//       alert("Server Error - " + error);
//     }
//     logout();
//   };

//   const toggleProfilePopup = () => {
//     setProfilePopupVisible(!isProfilePopupVisible);
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
  
//     try {
     
  
//       // const response = await axios.put(
//       //   `${process.VITE_HOST_URL}/api/admin/${user.id}/reset-password`,
//       //   {
//       //     confirmPassword,
//       //     newPassword,
//       //   }
//       // );

//       const response = await axiosInstance.post("/dashboard/change-password", 
//         {
//           newPassword,
//         }
//       )
  
//       console.log("Server response:", response);
  
//       if (response.data) {
//         setChangePasswordPopupVisible(false);
//         setConfirmPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//         alert("Password Updated Successfully.");
//       } else {
//         console.error("Server response data is undefined");
//       }
//     } catch (error) {
//       console.error("Error resetting password:", error);
//     }
//   };
  
//   const handleEditClick = (e) => {
//     e.preventDefault();
//     setIsEditing(true);
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//   };

  // const navigateNotification = () => {
  //   navigate("/admin/notifications");
  // }

//   const iconButtons = [
//     userData.role === "admin" ? { icon: notifications, alt: "Notification Icon", onClick: navigateNotification} : {},
//     { icon: profile, alt: "User profile icon", onClick: toggleProfilePopup },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         (isProfilePopupVisible) &&
//         !event.target.closest(".profile-popup") &&
//         !event.target.closest(".profile-icon-button")
//       ) {
//         setProfilePopupVisible(false);
//         setIsEditing(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [
//     isProfilePopupVisible,
//   ]);

//   const toggleChangePasswordPopup = () => {
//     setChangePasswordPopupVisible(!isChangePasswordPopupVisible);
//     setProfilePopupVisible(false);
//   };

//   return (
//     <header className="flex flex-col rounded-none">
//       <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
//         <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
//           {title}
//         </h1>
//         <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
//           <div className="flex items-center justify-center w-full md:w-auto">
//             <span className="text-lg font-medium">
//               {formatDate(currentTime)}
//             </span>
//             <span className="mx-4 text-gray-300">|</span>
//             <div className="text-2xl">{getTimeIcon()}</div>
//           </div>
//           <div className="relative flex justify-center gap-4 lg:gap-8">
//             {iconButtons.map((item, index) => (
              // <button
              //   key={index}
              //   className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100`}
              //   onClick={item.onClick}
              // >
              //   {typeof item.icon === "string" ? (
              //     <img
              //     loading="lazy"
              //       src={item.icon}
              //       className={`object-cover ${item.alt === "Notification Icon" ? "w-6 h-6" : "w-8 h-8"} `}
              //       alt={item.alt}
              //     />
              //   ) : (
              //     item.icon
              //   )}
              // </button>
//             ))}

//             {isProfilePopupVisible && (
//               <div className="absolute right-0 z-50 w-64 mt-10 bg-white border rounded-lg shadow-lg profile-popup">
//                 <ul className="p-2 divide-y divide-gray-200">
//                   <li>
//                     <button onClick={toggleChangePasswordPopup} 
//                     className="block w-full px-4 py-2 text-left text-gray-700 text-md hover:bg-gray-100">
//                       Change Password
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 text-left text-red-700 text-md hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}

// {isChangePasswordPopupVisible && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl change-password-popup">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
//               <button onClick={() => setChangePasswordPopupVisible(false)} className="text-gray-500 hover:text-gray-700">
//                 <FaTimes size={24} />
//               </button>
//             </div>
//             <form onSubmit={handleChangePassword}>
//               <div className="mb-4">
//                 <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="mb-6">
//                 <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   id="confirmPassword"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setChangePasswordPopupVisible(false)}
//                   className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCog, FaTimes } from "react-icons/fa";
import { BsSunset } from "react-icons/bs";
import profile from "../assets/profile.png";
import notifications from "../assets/notifications.png";
import axiosInstance from "../utils/axiosConfig";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Header({ title }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isSettingsPopupVisible, setSettingsPopupVisible] = useState(false);
  const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
  const [isAddAdminPopupVisible, setAddAdminPopupVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    password: "",
    aadhaar: "",
    mobile: "",
    age: "",
  });

  const { logout } = useAuth();
  const { userData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if(userData.role === "admin"){
      setIsUserAdmin(true);
    } else {
      setIsUserAdmin(false);
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-IN", options);
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 17) {
      return <FaSun className="text-yellow-500" />;
    } else if (hour >= 17 && hour < 20) {
      return <BsSunset className="text-orange-500" />;
    } else {
      return <FaMoon className="text-blue-300" />;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");
      if (response.data.success) {
        logout();
      } else {
        alert("Error Logging Out");
      }
    } catch (error) {
      alert("Server Error - " + error);
    }
  };

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!isProfilePopupVisible);
  };

  const toggleChangePasswordPopup = () => {
    setChangePasswordPopupVisible(!isChangePasswordPopupVisible);
    setProfilePopupVisible(false);
  };

  const toggleAddAdminPopup = () => {
    setAddAdminPopupVisible(!isAddAdminPopupVisible);
    setProfilePopupVisible(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/dashboard/change-password", {
        newPassword,
      });
      if (response.data) {
        setChangePasswordPopupVisible(false);
        setConfirmPassword("");
        setNewPassword("");
        alert("Password Updated Successfully.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/register", {
        ...adminDetails,
        role: "admin",
      });
      if (response.status === 201) {
        setAddAdminPopupVisible(false);
        setAdminDetails({
          name: "",
          email: "",
          password: "",
          aadhaar: "",
          mobile: "",
          age: "",
        });
        alert("Admin Added Successfully.");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      alert("Failed to add admin. Please try again.");
    }
  };
  const navigateNotification = () => {
    navigate("/admin/notifications");
  }

  return (
    <header className="flex flex-col rounded-none">
      <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
        <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
          {title}
        </h1>
        <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
          <div className="flex items-center justify-center w-full md:w-auto">
            <span className="text-lg font-medium">{formatDate(currentTime)}</span>
            <span className="mx-4 text-gray-300">|</span>
            <div className="text-2xl">{getTimeIcon()}</div>
          </div>
          <div className="relative flex justify-center gap-4 lg:gap-8">
            {isUserAdmin && (
              <button
              className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100`}
              onClick={navigateNotification}
            >
              
                <img
                loading="lazy"
                  src={notifications}
                  className={`object-cover w-6 h-6 `}
                  alt="Notification Icon"
                />
              
            </button>
            )}
            <button
              className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100`}
              onClick={toggleProfilePopup}
            >
              <img src={profile} alt="User profile icon" className="w-8 h-8 object-cover" />
            </button>
            {isProfilePopupVisible && (
              <div className="absolute right-0 z-50 w-64 mt-10 bg-white border rounded-lg shadow-lg profile-popup">
                <ul className="p-2 divide-y divide-gray-200">
                  <li>
                    <button
                      onClick={toggleChangePasswordPopup}
                      className="block w-full px-4 py-2 text-left text-gray-700 text-md hover:bg-gray-100"
                    >
                      Change Password
                    </button>
                  </li>
                  {isUserAdmin && (
                    <li>
                    <button
                      onClick={toggleAddAdminPopup}
                      className="block w-full px-4 py-2 text-left text-gray-700 text-md hover:bg-gray-100"
                    >
                      Add Admin
                    </button>
                  </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-700 text-md hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {/* Add Admin Popup */}
            {isAddAdminPopupVisible && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Add Admin</h2>
                    <button
                      onClick={() => setAddAdminPopupVisible(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleAddAdmin}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={adminDetails.name}
                        onChange={(e) =>
                          setAdminDetails({ ...adminDetails, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={adminDetails.email}
                        onChange={(e) =>
                          setAdminDetails({ ...adminDetails, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={adminDetails.password}
                        onChange={(e) =>
                          setAdminDetails({ ...adminDetails, password: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="aadhaar" className="block mb-2 text-sm font-medium text-gray-700">
                        Aadhaar
                      </label>
                      <input
                        type="text" id="aadhaar" value={adminDetails.aadhaar} onChange={(e) => setAdminDetails({ ...adminDetails, aadhaar: e.target.value }) } className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required /> </div> <div className="mb-4"> <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-700"> Mobile Number </label> <input type="text" id="mobile" value={adminDetails.mobile} onChange={(e) => setAdminDetails({ ...adminDetails, mobile: e.target.value }) } className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required /> </div> <div className="mb-4"> <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-700"> Age </label> <input type="number" id="age" value={adminDetails.age} onChange={(e) => setAdminDetails({ ...adminDetails, age: e.target.value }) } className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" /> </div> <div className="flex justify-end space-x-2"> <button type="button" onClick={() => setAddAdminPopupVisible(false)} className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500" > Cancel </button> <button type="submit" className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] focus:outline-none focus:ring-2 focus:ring-blue-500" > Add Admin </button> </div> </form> </div> </div> )}
        {/* Change Password Popup */}
        {isChangePasswordPopupVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl change-password-popup">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
                <button
                  onClick={() => setChangePasswordPopupVisible(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes size={24} />
                </button>
              </div>
              <form onSubmit={handleChangePassword}>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setChangePasswordPopupVisible(false)}
                    className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#255d69] hover:bg-[#243947] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
</header>
); }

export default Header;