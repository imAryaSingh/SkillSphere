import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    photo: null,
    skills_offered: '',
    skills_wanted: '',
    availability: '',
    is_public: true,
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      if (file && !file.type.startsWith('image/')) {
        setError('Incorrect file type. Please upload an image.');
        setForm({ ...form, [name]: null });
        return;
      }
      setError('');
      setForm({ ...form, [name]: file || null });
    } else {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all required fields.');
      setSuccess('');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }

    setError('');

    const userData = {
      name: form.name,
      location: form.location,
      skillsOffered: form.skills_offered,
      skillsWanted: form.skills_wanted,
      availability: form.availability,
      isPublic: form.is_public,
      email: form.email,
      password: form.password,
      role: form.role
    };

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('🎉 Registration successful!');
        setError('');
      } else {
        setError(data.error || 'Registration failed.');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-sky-50">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 p-8 rounded-2xl shadow-md min-h-[600px]">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Register</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Location (optional)</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Photo */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Profile Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Skills Offered */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Skills Offered</label>
              <input
                type="text"
                name="skills_offered"
                placeholder="e.g., JavaScript, Cooking"
                value={form.skills_offered}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Skills Wanted */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Skills Wanted</label>
              <input
                type="text"
                name="skills_wanted"
                placeholder="e.g., Design, French"
                value={form.skills_wanted}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Availability */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Availability</label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              >
                <option value="">Select Availability</option>
                <option value="Weekdays">Weekdays</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
              </select>
            </div>

            {/* Public Profile Checkbox */}
            <div className="col-span-full flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                name="is_public"
                checked={form.is_public}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <label className="text-sm text-gray-700">Make profile public</label>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              />
            </div>

            {/* Role */}
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="border px-4 py-2 rounded-lg"
              >
                <option value="user">Register as User</option>
                <option value="admin">Register as Admin</option>
              </select>
            </div>

            {/* Button and Messages */}
            <div className="col-span-full flex flex-col items-center gap-3 mt-6">
              {error && (
                <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded w-full max-w-xl text-center">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-green-600 text-sm bg-green-100 px-4 py-2 rounded w-full max-w-xl text-center">
                  {success}
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold shadow transition w-full max-w-xs"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
