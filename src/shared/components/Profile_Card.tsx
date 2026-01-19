import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../shared/services/get_profile.tsx";

const ProfileCard = () => {
  const navigate = useNavigate();
  const { fetchUserProfile, profile, isLoading, isError, errorMessage } =
    useUserInfo();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (isError && errorMessage) {
      if (
        errorMessage === "Invalid or expired token" ||
        errorMessage === "No access token available"
      ) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      console.error("Error fetching user profile:", errorMessage);
    }
  }, [isError, errorMessage, navigate]);

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div className='absolute bottom-0 w-full p-4 border-t'>
        <div className='flex items-center animate-pulse'>
          <div className='h-10 w-10 rounded-full bg-gray-300'></div>
          <div className='ml-3 space-y-2'>
            <div className='h-4 w-24 bg-gray-300 rounded'></div>
            <div className='h-3 w-32 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 No profile (safety check)
  if (!profile) return null;

  return (
    <div className='absolute bottom-0 w-full p-4 border-t'>
      <div className='flex items-center'>
        <img
          src={profile.profile_image!}
          alt='Profile'
          className='h-10 w-10 rounded-full object-cover'
        />

        <div className='ml-3'>
          <p className='font-medium'>{profile.full_name}</p>
          <p className='text-sm text-gray-500'>{profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
