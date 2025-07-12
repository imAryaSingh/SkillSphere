import React from 'react';
import Navbar from '../components/Navbar';

const User = ({ user }) => {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Navbar />
        <h2 className="text-2xl font-bold mt-8">Please login to view your profile.</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar user={user} />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.photo || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full border mb-2"
          />
          <span className="text-lg font-semibold">{user.name}</span>
          <span className="text-gray-600">{user.location}</span>
        </div>
        <div className="mb-4">
          <strong>Skills Offered:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skills_offered?.map((skill, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <strong>Skills Wanted:</strong>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skills_wanted?.map((skill, idx) => (
              <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">{skill}</span>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <strong>Availability:</strong> {user.availability}
        </div>
        <div className="mb-2">
          <strong>Profile Status:</strong> {user.is_public ? 'Public' : 'Private'}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
      </div>
    </>
  );
};

export default User;
