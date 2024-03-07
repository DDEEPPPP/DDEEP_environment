import React from 'react';

function PageSelect({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (event) => {
    const inputPage = parseInt(event.target.value, 10);
    if (inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage);
    }
  };
  return (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </button>
      <span>
        <input type="number" value={currentPage} onChange={handlePageChange} />
      </span>
      <span>{totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        다음
      </button>
    </div>
  );
}

export default PageSelect;
