import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [availability, setAvailability] = useState('');

  const handleSearch = () => {
    onSearch(query, availability);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 my-4">
      <select
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Availability</option>
        <option value="Weekends">Weekends</option>
        <option value="Evenings">Evenings</option>
        <option value="Weekdays">Weekdays</option>
      </select>

      <input
        type="text"
        placeholder="Search skills..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 border rounded"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
