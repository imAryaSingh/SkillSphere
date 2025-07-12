import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import SkillCard from '../components/SkillCard';
import Pagination from '../components/pagination';
import { useNavigate } from 'react-router-dom';

const dummyUsers = [
  {
    name: "Marc Demo",
    location: "Delhi",
    photo: "/default-profile.png",
    skills_offered: ["Excel", "Photoshop"],
    skills_wanted: ["SEO", "Python"],
    availability: "Weekends",
    rating: 4.5,
    is_public: true,
  },
  {
    name: "Michel",
    location: "Mumbai",
    photo: "/default-profile.png",
    skills_offered: ["Java", "HTML"],
    skills_wanted: ["React", "Photoshop"],
    availability: "Evenings",
    rating: 3.5,
    is_public: true,
  },
  {
    name: "Joe Vills",
    location: "Bangalore",
    photo: "/default-profile.png",
    skills_offered: ["Python", "Data Entry"],
    skills_wanted: ["Excel"],
    availability: "Weekdays",
    rating: 4.2,
    is_public: true,
  },
];

const ITEMS_PER_PAGE = 2;

const Home = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query, availability) => {
    const results = dummyUsers.filter((user) =>
      user.is_public &&
      (query === '' ||
        user.skills_offered.some((skill) => skill.toLowerCase().includes(query.toLowerCase())) ||
        user.skills_wanted.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))) &&
      (availability === '' || user.availability === availability)
    );
    setUsers(results);
    setCurrentPage(1);
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleRequest = (user) => {
    if (!loggedIn) {
      alert("Please login to request a skill swap.");
    } else {
      alert(`Requesting swap with ${user.name}`);
    }
  };

  const handleUserClick = (user) => {
    navigate('/user-detail', { state: { user } });
  };

  return (
    <>
      <Navbar user={loggedIn ? { photo: "/default-profile.png" } : null} onLoginClick={() => setLoggedIn(true)} />
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <div className="mt-6 space-y-4">
          <AnimatePresence>
            {paginatedUsers.map((user, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                onClick={() => handleUserClick(user)}
                className="cursor-pointer"
              >
                <SkillCard
                  user={user}
                  onRequestClick={handleRequest}
                  isLoggedIn={loggedIn}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
