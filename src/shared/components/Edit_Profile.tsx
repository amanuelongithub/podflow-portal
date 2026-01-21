import { useState, ChangeEvent, FormEvent } from "react";
import Input from "./Input.tsx";

// Define form data type
interface FormData {
  fullName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Updated data:", formData);
    setLoading(false);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      fullName: "John Doe",
      email: "john.doe@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className='min-h-screen py-8 px-4 font-poppins'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        {/* <div className='mb-8'>
          <h1 className='text-3xl font-bold text-[#1F1F1F] mb-2'>
            Edit Profile
          </h1>
          <p className='text-[#7B7B7B]'>
            Manage your personal information and email preferences
          </p>
        </div> */}

        {/* Profile Card */}
        <div className='bg-[#FFFFFF] rounded-2xl shadow-sm p-6 md:p-8'>
          <form onSubmit={handleSubmit}>
            {/* Profile Picture Section */}
            <div className='flex items-center gap-6 mb-8 pb-8 border-b border-gray-100'>
              <div className='relative'>
                <div className='w-20 h-20 rounded-full bg-[rgba(255,107,0,0.1)] flex items-center justify-center text-3xl font-semibold text-[#FF6B00]'>
                  {formData.fullName.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className='font-semibold text-[#1F1F1F] mb-2'>
                  Profile Picture
                </h3>
                <button
                  type='button'
                  className='px-4 py-2 text-sm font-medium text-[#FF6B00] hover:bg-[rgba(255,107,0,0.1)] rounded-lg transition-colors'
                >
                  Change Picture
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className='space-y-6'>
              {/* Full Name */}
              <div>
                <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                  Full Name
                </label>
                <Input
                  readOnly={!isEditing}
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                  Email Address
                </label>
                <Input
                  readOnly={!isEditing}
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter your email'
                />
              </div>

              {/* Password Section - Only show when editing */}
              {isEditing && (
                <>
                  <div className='pt-4 border-t border-gray-100'>
                    <h3 className='text-lg font-semibold text-[#1F1F1F] mb-4'>
                      Change Password
                    </h3>

                    <div className='space-y-4'>
                      <div>
                        <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                          Current Password
                        </label>
                        <Input
                          name='currentPassword'
                          type='password'
                          value={formData.currentPassword}
                          onChange={handleChange}
                          placeholder='Enter current password'
                          isPassword
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                          New Password
                        </label>
                        <Input
                          name='newPassword'
                          type='password'
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder='Enter new password'
                          isPassword
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                          Confirm New Password
                        </label>
                        <Input
                          name='confirmPassword'
                          type='password'
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder='Confirm new password'
                          isPassword
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-gray-100'>
              {!isEditing ? (
                <button
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className='h-10 px-6  bg-[#FF6B00] text-white font-medium rounded-lg '
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type='submit'
                    disabled={loading}
                    className='
                    h-10
                    px-6  bg-[#FF6B00] text-white font-medium rounded-lg hover:bg-[#E55A00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
                  >
                    {loading ? (
                      <>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>

                  <button
                    type='button'
                    onClick={handleCancel}
                    disabled={loading}
                    className='h-10 px-6  border border-gray-300 text-[#1F1F1F] font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center'
                  >
                    Cancel
                  </button>
                </>
              )}

              <button
                type='button'
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete your account? This action cannot be undone.",
                    )
                  ) {
                    console.log("Account deletion requested");
                  }
                }}
                className='h-10 px-6  text-[#FF6B00] font-medium rounded-lg hover:bg-[rgba(255,107,0,0.1)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 sm:ml-auto'
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>

        {/* Info Note */}
        {/* <div className='mt-6 p-4 bg-[rgba(255,107,0,0.1)] rounded-lg'>
          <p className='text-sm text-[#7B7B7B]'>
            <span className='font-medium text-[#FF6B00]'>Note:</span> Some
            information may take up to 24 hours to update across all systems.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default EditProfile;
