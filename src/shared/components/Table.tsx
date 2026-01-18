// Table.tsx - FIXED VERSION
import React from 'react';

interface Column<T> {
  header: string;
  accessor?: keyof T | string; // Make accessor optional
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  keyExtractor?: (row: T) => string | number;
}

const Table = <T,>({ 
  data = [], 
  columns = [], 
  className = '',
  isLoading = false,
  emptyMessage = 'No data available',
  keyExtractor
}: TableProps<T>) => {
  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={`header-${index}`}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={keyExtractor ? keyExtractor(row) : `row-${rowIndex}`}
              className="hover:bg-gray-50"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render 
                    ? column.render(row) 
                    : column.accessor 
                      ? String(row[column.accessor as keyof T] || '')
                      : '-' // Fallback for columns without accessor
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;