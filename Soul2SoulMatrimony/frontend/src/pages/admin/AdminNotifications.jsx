import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import Layout from "../../layouts/Layout";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("notifications");
        if (response.status === 200) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleSelectNotification = (notification) => {
    setSelectedNotification(notification);
  };

  const handleUpdatePassword = async (email) => {
    const newPassword = prompt("Enter the new password for the user:");
    if (!newPassword) return;
  
    try {
      const response = await axiosInstance.post("/auth/update-password", {
        email,
        newPassword,
      });
  
      if (response.status === 200) {
        alert("Password updated successfully.");
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== selectedNotification.id)
        );
        setSelectedNotification(null);
      } else {
        alert(response.data.message || "Error updating password. Try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
  };
  

  return (
    <Layout pageTitle="Notifications">
      <div className="min-h-screen p-8 bg-gray-50">
      {notifications.length == 0 
      ? (
        <center><h2>No New Notifications</h2></center>
      ) 
      : (<div></div>)
      }
      {selectedNotification ? (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700">
            Update Password for {selectedNotification.email}
          </h3>
          <button
            className="px-4 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => handleUpdatePassword(selectedNotification.email)}
          >
            Update Password
          </button>
          <button
            className="px-4 py-2 mt-4 ml-4 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => setSelectedNotification(null)}
          >
            Back
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectNotification(notif)}
            >
              <p className="text-gray-700">
                <strong>{notif.email}</strong> requested a password update.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </Layout>
  );
};

export default AdminNotifications;
