import React from 'react';

const SkillCard = ({ user, onRequestClick, isLoggedIn }) => {
  return (
    <div className="border rounded p-4 shadow-sm mb-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          src={user.photo || "/default-profile.png"}
          alt="Profile"
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-sm">📍 {user.location || "N/A"}</p>
          <p className="text-sm">
            <strong>Skills Offered:</strong> {user.skills_offered.join(', ')}
          </p>
          <p className="text-sm">
            <strong>Skills Wanted:</strong> {user.skills_wanted.join(', ')}
          </p>
          <p className="text-sm">⏰ {user.availability}</p>
        </div>
      </div>

      <button
        onClick={() => onRequestClick(user)}
        className={`mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isLoggedIn}
        title={!isLoggedIn ? "Please login to request a swap" : "Send Swap Request"}
      >
        Request
      </button>
    </div>
  );
};

export default SkillCard;
