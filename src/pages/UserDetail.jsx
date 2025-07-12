import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserDetail = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Navbar />
        <h2 className="text-2xl font-bold mt-8">User not found.</h2>
      </div>
    );
  }

  const handleRequest = () => {
    setShowModal(true);
  };

  const handleSendRequest = () => {
    if (!offeredSkill || !wantedSkill) {
      alert('Please select both offered and wanted skills.');
      return;
    }
    alert(`Request sent to ${user.name}!
Offered Skill: ${offeredSkill}
Wanted Skill: ${wantedSkill}
Message: ${message}`);
    setShowModal(false);
    setOfferedSkill('');
    setWantedSkill('');
    setMessage('');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
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
        <button onClick={handleRequest} className="bg-blue-600 text-white py-2 px-4 rounded font-semibold mt-4">Request Skill Exchange</button>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-md">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4 text-center">Send Skill Exchange Request</h3>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Choose Offered Skill</label>
                <select
                  value={offeredSkill}
                  onChange={e => setOfferedSkill(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Select Skill</option>
                  {user.skills_offered?.map((skill, idx) => (
                    <option key={idx} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Choose Wanted Skill</label>
                <select
                  value={wantedSkill}
                  onChange={e => setWantedSkill(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Select Skill</option>
                  {user.skills_wanted?.map((skill, idx) => (
                    <option key={idx} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                  rows={3}
                  placeholder="Write your message..."
                />
              </div>
              <button
                onClick={handleSendRequest}
                className="bg-blue-600 text-white py-2 px-4 rounded font-semibold w-full"
              >
                Send Request
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;
