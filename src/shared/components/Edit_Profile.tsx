import { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
import Input from "./Input.tsx";
import { useUserProfile } from "../services/profile.tsx";
import { loginRoute } from "../../core/routes.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "./Toast.js";
import { imageUrl } from "../../core/config.ts";
import WarningModal from "./custom_modal.tsx";

interface FormData {
  full_name: string;
  company_name: string;
  phone_number: string;
  bio?: string;
  profile_image?: File | null;
}

interface User {
  full_name: string;
  company_name: string;
  phone_number: string;
  bio?: string;
  profile_image?: File | null;
}

const EditProfile = () => {
  const { fetchUserProfile, profile, isError, errorMessage, editUserProfile } =
    useUserProfile();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    company_name: "",
    phone_number: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      fetchUserProfile();
    }
    if (profile) {
      setFormData({
        full_name: profile?.full_name || "",
        company_name: profile?.company_name || "",
        phone_number: profile?.phone_number || "",
        bio: profile?.bio || "",
      });
      if (profile?.profile_image) {
        setProfileImagePreview(profile.profile_image);
      }
    }
  }, [profile]);

  useEffect(() => {
    if (
      isError &&
      (errorMessage === "Invalid or expired token" ||
        errorMessage === "No access token available")
    ) {
      localStorage.removeItem("token");
      navigate(loginRoute, { replace: true });
    }
  }, [isError, errorMessage, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare user object for EditUserProfile method
      const userToUpdate: User = {
        full_name: formData.full_name,
        company_name: formData.company_name,
        phone_number: formData.phone_number,
        bio: formData.bio || "",
        profile_image: profileImage,
      };

      // Call your EditUserProfile method
      await editUserProfile(userToUpdate);

      if (profile) {
        setFormData({
          full_name: profile.full_name || "",
          company_name: profile.company_name || "",
          phone_number: profile.phone_number || "",
          bio: profile.bio || "",
        });

        // Clear the file input
        setProfileImage(null);
        if (profileImagePreview) {
          URL.revokeObjectURL(profileImagePreview);
          setProfileImagePreview("");
        }
      }

      setLoading(false);
      setIsEditing(false);
      success("Profile updated successfully!");
    } catch (er) {
      console.error("Update failed:", er);
      setLoading(false);
      error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        full_name: profile?.full_name || "",
        company_name: profile?.company_name || "",
        phone_number: profile?.phone_number || "",
        bio: profile?.bio || "",
      });
      setProfileImage(null);
      if (profile?.profile_image) {
        setProfileImagePreview(profile.profile_image);
      } else {
        setProfileImagePreview("");
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  function setShowDeleteModal(arg0: boolean): void {
    <WarningModal
      isOpen={true}
      onClose={() => {}}
      onConfirm={() => {}}
      title='Delete Account'
      message='Are you sure you want to delete your account? This action cannot be undone.'
      confirmText='Delete Account'
      cancelText='Cancel'
      isLoading={false}
    />;
  }

  return (
    <div className='min-h-screen py-8 px-4 font-poppins'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-[#FFFFFF] rounded-2xl shadow-sm p-6 md:p-8'>
          <form onSubmit={handleSubmit}>
            {/* Profile Picture Section - UPDATED */}
            <div className='flex items-center gap-6 mb-8 pb-8 border-b border-gray-100'>
              <div className='relative'>
                <div className='w-20 h-20 rounded-full overflow-hidden bg-[rgba(255,107,0,0.1)] flex items-center justify-center'>
                  {profileImage || profile?.profile_image ? (
                    profileImage ? (
                      <img
                        src={profileImagePreview}
                        alt='Profile'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <img
                        src={imageUrl + profile?.profile_image}
                        alt='Profile'
                        className='w-full h-full object-cover'
                      />
                    )
                  ) : (
                    <div className='text-3xl font-semibold text-[#FF6B00]'>
                      {formData.full_name.charAt(0) || "?"}
                    </div>
                  )}
                </div>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept='image/*'
                  className='hidden'
                />
              </div>
              <div>
                <h3 className='font-semibold text-[#1F1F1F] mb-2'>
                  Profile Picture
                </h3>
                <div className='gap-4 flex'>
                  <button
                    type='button'
                    onClick={triggerFileInput}
                    className='px-4 py-2 text-sm font-medium text-[#FF6B00] bg-[rgba(255,107,0,0.1)] rounded-lg transition-colors'
                  >
                    {profileImagePreview || profile?.profile_image
                      ? "Change Picture"
                      : "Upload Picture"}
                  </button>
                </div>
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
                  name='full_name'
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder='Enter your full name'
                />
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                  Email Address
                </label>
                <Input
                  readOnly={true}
                  name='email'
                  type='email'
                  value={profile?.email || ""}
                  placeholder='Email cannot be changed'
                  className='bg-gray-50 cursor-not-allowed'
                />
              </div>

              {/* Company Name */}
              <div>
                <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                  Company Name
                </label>
                <Input
                  readOnly={!isEditing}
                  name='company_name'
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder='Enter your company name'
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                  Phone Number
                </label>
                <Input
                  readOnly={!isEditing}
                  name='phone_number'
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder='Enter your phone number'
                />
              </div>

              {/* Bio */}
              <div>
                <label className='block text-sm font-medium text-[#1F1F1F] mb-2'>
                  Bio
                </label>
                <textarea
                  readOnly={!isEditing}
                  name='bio'
                  value={formData.bio || ""}
                  onChange={handleChange}
                  placeholder='Tell us about yourself'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent disabled:bg-gray-50'
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 mt-8 pt-8 border-t border-gray-100'>
              {!isEditing ? (
                <button
                  type='button'
                  onClick={() => setIsEditing(true)}
                  className='h-10 px-6 bg-[#FF6B00] text-white font-medium rounded-lg hover:bg-[#E55A00] transition-colors'
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type='submit'
                    disabled={loading}
                    className='h-10 px-6 bg-[#FF6B00] text-white font-medium rounded-lg hover:bg-[#E55A00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center'
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
                    className='h-10 px-6 border border-gray-300 text-[#1F1F1F] font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
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
                className='h-10 px-6 text-[#FF6B00] font-medium rounded-lg hover:bg-[rgba(255,107,0,0.1)] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:ring-offset-2 sm:ml-auto'
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
