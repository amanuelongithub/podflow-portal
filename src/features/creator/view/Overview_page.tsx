import React from "react";
import { theme } from "../../../core/theme";

const OverviewPage = () => {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'></div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-4 border-b'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-xl font-semibold'>Users</h2>
              <p className='text-gray-500 text-sm'>
                Overview of user statistics
              </p>
            </div>
            <button
              style={{ background: theme.colors.primary }}
              className='px-4 py-2 text-white rounded text-sm font-medium'
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewPage;
