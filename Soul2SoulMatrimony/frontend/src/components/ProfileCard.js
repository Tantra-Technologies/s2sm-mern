// frontend/components/ProfileCard.js

import React from "react";

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <h3>{profile.name}</h3>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>Gender: {profile.gender}</p>
    </div>
  );
};

export default ProfileCard;
