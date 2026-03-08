import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  itemsPerPage = 10,
}) => {
  return (
    <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between rounded-b-lg relative mx-4 mb-4 shadow-sm h-16 w-full max-w-full">
      <div className="absolute inset-x-0 -bottom-2 h-16 bg-white rounded-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-between px-6 z-10 mx-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <select 
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            defaultValue={itemsPerPage}
            disabled // Currently fixed per API response
          >
            <option value={itemsPerPage}>{itemsPerPage}</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-1 rounded text-gray-400 hover:bg-gray-100 disabled:opacity-50"
          >
            <span className="sr-only">First</span>
            <span aria-hidden="true">|&lt;</span>
          </button>
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="p-1 rounded text-gray-400 hover:bg-gray-100 disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <span aria-hidden="true">&lt;</span>
          </button>

          <div className="flex items-center gap-1 mx-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5) {
                if (currentPage > 3) {
                  pageNum = currentPage - 2 + i;
                }
                if (currentPage > totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                }
              }

              if (pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentPage === pageNum
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded text-gray-400 hover:bg-gray-100 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
            <span aria-hidden="true">&gt;</span>
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-1 rounded text-gray-400 hover:bg-gray-100 disabled:opacity-50"
          >
            <span className="sr-only">Last</span>
            <span aria-hidden="true">&gt;|</span>
          </button>
        </div>

        <div className="text-sm text-gray-600">Total Records: {totalItems}</div>
      </div>
    </div>
  );
};

export default Pagination;
