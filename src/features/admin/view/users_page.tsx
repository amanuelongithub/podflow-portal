import React from "react";
import { useUserStore } from "../../../shared/services/users.tsx";
import Table from "../../../shared/components/Table.tsx";
import { User } from "../../model/users_model.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/components/Toast.js";
import { loginRoute, unAuthorizedRoute } from "../../../core/routes.ts";
import { imageUrl } from "../../../core/config.ts";
import { MdOutlineRefresh } from "react-icons/md";
import { theme } from "../../../core/theme.js";
function UsersSettingsPage() {
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

  const { fetchUsers, users, isLoading, isError, unAuthorized, errorMessage } =
    useUserStore();

  const { error } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isError && errorMessage) {
      console.log("is Error:", isError);
      console.log("Error Message:", errorMessage);

      if (
        errorMessage === "Invalid or expired token" ||
        errorMessage === "No access token available"
      ) {
        localStorage.removeItem("token");
        navigate(loginRoute, { replace: true });
        return;
      }
      error(errorMessage);
    } else if (unAuthorized) {
      navigate(unAuthorizedRoute, { replace: true });
    }
  }, [isError, unAuthorized, errorMessage, error, navigate]);

  const totalUsers = users?.data?.length ?? 0;
  const adminUsers = users?.data?.filter((u) => u.role_id === 3).length ?? 0;
  const creatorUsers = users?.data?.filter((u) => u.role_id === 2).length ?? 0;
  const regularUsers = users?.data?.filter((u) => u.role_id === 1).length ?? 0;
  const verifiedUsers =
    users?.data?.filter((u) => u.email_verified).length ?? 0;

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
          {user.profile_image != null ? (
            <img
              src={imageUrl + user.profile_image}
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

  return (
    <div>
      <main>
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
      </main>

      {/* Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-4 border-b'>
          <div className='flex justify-between items-center'>
            <div>
              <h2 className='text-xl font-semibold'>Users</h2>
              <p className='text-gray-500 text-sm'>
                {isLoading ? "Loading..." : `${users?.data?.length} users`}
              </p>
            </div>
            <button
              onClick={getUsers}
              className='w-10 h-10 rounded-full flex items-center justify-center
                         border border-gray-100 hover:bg-gray-100 transition'
            >
              <MdOutlineRefresh size={24} color={theme.colors.primary} />
            </button>
          </div>
        </div>
        <Table<User>
          data={users?.data || []}
          columns={userColumns}
          isLoading={isLoading}
          emptyMessage='No users found'
          keyExtractor={(user: User) => user.id}
        />
      </div>
    </div>
  );
}

export default UsersSettingsPage;
