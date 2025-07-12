import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded-full" />
        <Link to="/" className="text-xl font-bold hover:underline">SkillSphere</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/login" className="bg-white text-blue-600 px-4 py-1 rounded font-medium hover:underline">Login</Link>
        <Link to="/register" className="bg-white text-blue-600 px-4 py-1 rounded font-medium hover:underline">Register</Link>
        {user && (
          <img
            src={user.photo || '/default-profile.png'}
            alt="User"
            className="w-8 h-8 rounded-full border"
          />
        )}
      </div>
        {/* ...existing code... */}
    </nav>
  );
};

export default Navbar;
