import React, { useEffect, useState } from "react";
import { useUserInfo } from "../../shared/services/user.tsx";
import { useToast } from "../../shared/components/Toast.js";
import Table from "../../shared/components/Table.tsx";
import { User } from "../../features/model/user_model.ts";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { fetchUsers, users, isLoading, isError, errorMessage } = useUserInfo();
  const { error } = useToast();

  const getUsers = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (isError) {
      error(errorMessage);
    }
  }, [isError, errorMessage, error]);

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

  const userColumns = [
    {
      header: "ID",
      accessor: "id" as const,
    },
    {
      header: "Full Name",
      accessor: "full_name" as const,
      render: (user: User) => (
        <div className='flex items-center'>
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt={user.full_name}
              className='h-8 w-8 rounded-full mr-3'
            />
          ) : (
            <div className='h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3'>
              <span className='text-gray-500 text-xs'>
                {user.full_name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <span className='font-medium'>
            {user.full_name || "No name provided"}
          </span>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email" as const,
      render: (user: User) => (
        <div className='flex items-center'>
          <span>{user.email}</span>
          {user.email_verified && (
            <span className='ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full'>
              Verified
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Company",
      accessor: "company_name" as const,
      render: (user: User) => <span>{user.company_name || "-"}</span>,
    },
    {
      header: "Phone",
      accessor: "phone_number" as const,
      render: (user: User) => <span>{user.phone_number || "-"}</span>,
    },
    {
      header: "Role",
      accessor: "role_id" as const,
      render: (user: User) => {
        const roleName = getRoleName(user.role_id);
        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              user.role_id === 3
                ? "bg-purple-100 text-purple-800"
                : user.role_id === 2
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {roleName}
          </span>
        );
      },
    },
    {
      header: "Created At",
      accessor: "created_at" as const,
      render: (user: User) => {
        const date = new Date(user.created_at);
        return <span title={user.created_at}>{date.toLocaleDateString()}</span>;
      },
    },
    {
      header: "Actions",
      render: (user: User) => (
        <div className='flex space-x-2'>
          <button
            onClick={() => console.log("Edit", user.id)}
            className='px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-sm font-medium transition-colors'
          >
            Edit
          </button>
          <button
            onClick={() => console.log("Delete", user.id)}
            className='px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded text-sm font-medium transition-colors'
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const totalUsers = users.length;
  const adminUsers = users.filter((u) => u.role_id === 3).length;
  const creatorUsers = users.filter((u) => u.role_id === 2).length;
  const regularUsers = users.filter((u) => u.role_id === 1).length;
  const verifiedUsers = users.filter((u) => u.email_verified).length;

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
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className='p-6 border-b'>
          <h1 className='text-xl font-bold'>PodFlow</h1>
          <p className='text-sm text-gray-500'>Admin Panel</p>
        </div>

        <nav className='p-4'>
          <ul className='space-y-2'>
            <li>
              <button className='w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium'>
                Dashboard
              </button>
            </li>
            <li>
              <button className='w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100'>
                Users
              </button>
            </li>
            <li>
              <button className='w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100'>
                Creators
              </button>
            </li>
            <li>
              <button className='w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100'>
                Content
              </button>
            </li>
            <li>
              <button className='w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100'>
                Settings
              </button>
            </li>
          </ul>
        </nav>

        <div className='absolute bottom-0 w-full p-4 border-t'>
          <div className='flex items-center'>
            <div className='h-10 w-10 rounded-full bg-gray-300'></div>
            <div className='ml-3'>
              <p className='font-medium'>Admin</p>
              <p className='text-sm text-gray-500'>admin@podflow.com</p>
            </div>
          </div>
        </div>
      </div>

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
              <div className='h-8 w-8 rounded-full bg-gray-300'></div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className='p-6'>
          {/* Stats */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8'>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-gray-700 font-semibold'>Total Users</h3>
              <p className='text-3xl font-bold mt-2'>{totalUsers}</p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-gray-700 font-semibold'>Admins</h3>
              <p className='text-3xl font-bold mt-2 text-purple-600'>
                {adminUsers}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-gray-700 font-semibold'>Creators</h3>
              <p className='text-3xl font-bold mt-2 text-blue-600'>
                {creatorUsers}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-gray-700 font-semibold'>Users</h3>
              <p className='text-3xl font-bold mt-2 text-gray-600'>
                {regularUsers}
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow'>
              <h3 className='text-gray-700 font-semibold'>Verified</h3>
              <p className='text-3xl font-bold mt-2 text-green-600'>
                {verifiedUsers}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className='bg-white rounded-lg shadow overflow-hidden'>
            <div className='px-6 py-4 border-b'>
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className='text-xl font-semibold'>Users</h2>
                  <p className='text-gray-500 text-sm'>
                    {isLoading ? "Loading..." : `${users.length} users`}
                  </p>
                </div>
                <button
                  onClick={getUsers}
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium'
                >
                  Refresh
                </button>
              </div>
            </div>
            <Table<User>
              data={users}
              columns={userColumns}
              isLoading={isLoading}
              emptyMessage='No users found'
              keyExtractor={(user: User) => user.id}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
