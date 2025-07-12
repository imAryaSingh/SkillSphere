import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            currentPage === page ? "bg-blue-600 text-white" : "bg-white text-blue-600"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
