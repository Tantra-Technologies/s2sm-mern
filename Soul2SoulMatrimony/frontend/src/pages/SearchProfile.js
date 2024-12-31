// frontend/pages/SearchProfile.js

import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import ProfileCard from "../components/ProfileCard";

const SearchProfile = () => {
  const [search, setSearch] = useState("");
  const [profiles, setProfiles] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/profiles?search=${search}`
      );
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        alert("Failed to fetch profiles");
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  return (
    <AdminLayout>
      <h2>Search Profiles</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="profile-list">
        {profiles.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default SearchProfile;
