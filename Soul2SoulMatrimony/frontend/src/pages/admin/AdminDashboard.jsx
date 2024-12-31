import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConfig";
import Layout from "../../layouts/Layout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    onlineEmployees: 0,
    totalProfiles: 0,
    maleProfiles: 0,
    femaleProfiles: 0,
  });
  const [latestProfiles, setLatestProfiles] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await axios.get("/dashboard/admin-stats");
        const profileResponse = await axios.get("/dashboard/latest-profiles");

        setStats(statsResponse.data);
        setLatestProfiles(profileResponse.data);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout pageTitle="Admin Dashboard">
      {/* Welcome Section */}
      <div className="p-6 bg-white shadow-sm rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Welcome, Admin</h1>
        <p className="mt-2 text-gray-500">
          Here's an overview of the Matrimony platform's performance and statistics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Total Employees */}
        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Total Employees</h3>
          <p className="mt-4 text-4xl font-bold">{stats.totalEmployees}</p>
        </div>

        {/* Online Employees */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Employees Online</h3>
          <p className="mt-4 text-4xl font-bold">{stats.onlineEmployees}</p>
        </div>

        {/* Male Profiles */}
        <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Male Profiles</h3>
          <p className="mt-4 text-4xl font-bold">{stats.maleProfiles}</p>
        </div>

        {/* Female Profiles */}
        <div className="p-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Female Profiles</h3>
          <p className="mt-4 text-4xl font-bold">{stats.femaleProfiles}</p>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-6">
        <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Total Profiles</h3>
          <p className="mt-4 text-4xl font-bold">{stats.totalProfiles}</p>
          <p className="mt-2 text-sm text-red-200">Total profiles created.</p>
        </div>
      </div>

      {/* Latest Profiles */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Latest Profiles Created</h2>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <ul className="space-y-6">
            {latestProfiles.length > 0 ? (
              latestProfiles.map((profile) => (
                <li key={profile.id} className="flex items-center space-x-6 py-4 border-b border-gray-200">
                  {/* Profile Information */}
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-800">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{profile.gender} - {profile.age} years old</p>
                    <p className="text-sm text-gray-500">{profile.maritalStatus} | {profile.employedIn}</p>
                    <p className="text-sm text-gray-500">
                      {profile.highestDegree} | ₹ {profile.annualIncome} annually
                    </p>
                  </div>

                  {/* Profile Created At */}
                  <div className="text-sm text-gray-400">
                    {new Date(profile.createdAt).toLocaleString()}
                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No profiles created yet.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Performance Analytics */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Platform Performance Analytics</h2>
        <div className="p-6 bg-white shadow-sm rounded-lg">
          <p className="text-sm text-gray-500">
            Use the admin tools to analyze trends, employee contributions, and pending tasks.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
