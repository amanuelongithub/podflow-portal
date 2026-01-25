import { useState } from "react";
import AdminSidebar from "../creator/components/Admin_Sidebar.tsx";
import EditProfile from "../../shared/components/Edit_Profile.tsx";
import UsersSettingsPage from "./view/users_page.tsx";
import NotificationPage from "../creator/view/Notification_page.tsx";
import OverviewPage from "./view/overview_page.tsx";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(1);

  const menus = [
    {
      title: "Overview",
      index: 1,
    },
    {
      title: "Users Settings",
      index: 2,
    },
    {
      title: "Notiifications",
      index: 3,
    },
    {
      title: "Edit Profile",
      index: 4,
    },
  ];

  // Stats

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onclose={() => setSidebarOpen(false)}
        menus={menus}
        selectedMenuIndex={selectedMenuIndex}
        onMenuSelect={setSelectedMenuIndex}
      />

      {/* Main content */}
      <div className='flex-1 overflow-auto'>
        {/* Top header */}
        <header className='bg-white border-b px-6 py-4'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='lg:hidden p-2 rounded-md hover:bg-gray-100'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
            <div className='text-xl font-semibold ml-4 lg:ml-0'>Dashboard</div>
            <div className='flex items-center space-x-4'>
              <button className='p-2 hover:bg-gray-100 rounded-full'>
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className='flex-1 overflow-auto'>
          <main className='p-6'>
            {selectedMenuIndex === 1 ? (
              <OverviewPage />
            ) : selectedMenuIndex === 2 ? (
              <UsersSettingsPage />
            ) : selectedMenuIndex === 3 ? (
              <NotificationPage />
            ) : selectedMenuIndex === 4 ? (
              <EditProfile />
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
