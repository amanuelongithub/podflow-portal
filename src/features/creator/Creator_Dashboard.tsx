import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../shared/services/users.tsx";
import { useToast } from "../../shared/components/Toast.js";
import Table from "../../shared/components/Table.tsx";
import { User } from "../model/users_model.ts";
import Sidebar from "./components/Sidebar.tsx";
import { theme } from "../../core/theme.js";
import EditProfile from "../../shared/components/Edit_Profile.tsx";
import OverviewPage from "./view/Overview_page.tsx";
import PodcastPage from "./view/Podcast_page.tsx";
import NotificationPage from "./view/Notification_page.tsx";
import { loginRoute } from "../../core/routes.ts";

function CreatorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(1);

  const menus = [
    {
      title: "Overview",
      index: 1,
    },
    {
      title: "Podcasts",
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

  const { fetchUsers, users, isLoading, isError, errorMessage } = useUserStore();
  const { error } = useToast();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    if (isError && errorMessage) {
      if (
        errorMessage === "Invalid or expired token" ||
        errorMessage === "No access token available"
      ) {
        localStorage.removeItem("token");
        navigate(loginRoute, { replace: true });
        return;
      }

      error(errorMessage);
    }
  }, [isError, errorMessage, error, navigate]);

  const getRoleName = (roleId: number): string => {
    switch (roleId) {
      case 1:
        return "User";
      case 2:
        return "Creator";
      case 3:
        return "Admin";
      default:
        return `Unknown (${roleId})`;
    }
  };

  const getUsers = async () => {
    await fetchUsers();
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar
        open={sidebarOpen}
        onclose={() => setSidebarOpen(false)}
        menus={menus}
        selectedMenuIndex={selectedMenuIndex}
        onMenuSelect={setSelectedMenuIndex}
      />

      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='bg-white border-b px-6 py-4 sticky top-0 z-10'>
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
            <div className='text-xl font-semibold ml-4 lg:ml-0'>
              CreatorDashboard
            </div>
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
              <PodcastPage />
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

export default CreatorDashboard;
