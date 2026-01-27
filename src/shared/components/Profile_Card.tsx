import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../services/profile.tsx";
import { IoMdMore } from "react-icons/io";
import { FiLogOut, FiUser } from "react-icons/fi";
import { loginRoute } from "../../core/routes.ts";
import { imageUrl } from "../../core/config.ts";

type ProfileCardProps = {
  onPress?: () => void;
};

const ProfileCard = ({ onPress }: ProfileCardProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { fetchUserProfile, profile, isLoading, isError, errorMessage } =
    useUserProfile();

  // close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  const logout = () => {
    localStorage.removeItem("token");
    navigate(loginRoute, { replace: true });
  };

  const viewProfile = () => {
    setIsMenuOpen(false);
    if (onPress) {
      onPress();
    }
  };

  if (isLoading) {
    return (
      <div className='absolute bottom-0 w-full p-4 border-t bg-white'>
        <div className='flex items-center animate-pulse'>
          <div className='h-10 w-10 rounded-full bg-gray-200' />
          <div className='ml-3 space-y-2 flex-1'>
            <div className='h-4 w-32 bg-gray-200 rounded' />
            <div className='h-3 w-40 bg-gray-100 rounded' />
          </div>
          <div className='h-8 w-8 rounded-full bg-gray-200' />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className='absolute bottom-0 w-full p-4 border-t bg-white'>
      <div className='flex items-center justify-between'>
        <div
          className='flex items-center min-w-0 flex-1 cursor-pointer'
          onClick={onPress}
        >
          <img
            src={imageUrl + profile.profile_image}
            alt='Profile'
            className='h-10 w-10 rounded-full object-cover flex-shrink-0'
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile.full_name,
              )}&background=random`;
            }}
          />
          <div className='ml-3 min-w-0'>
            <p className='font-medium text-sm truncate'>{profile.full_name}</p>
            <p className='text-xs text-gray-500 truncate'>{profile.email}</p>
          </div>
        </div>

        <div className='relative' ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ${
              isMenuOpen ? "bg-gray-100" : ""
            }`}
            aria-label='Menu'
            aria-expanded={isMenuOpen}
          >
            <IoMdMore size={18} className='text-gray-600' />
          </button>

          {isMenuOpen && (
            <div className='absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border py-1 animate-in fade-in slide-in-from-top-1'>
              <button
                onClick={viewProfile}
                className='w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors'
              >
                <FiUser size={16} className='text-gray-400' />
                View Profile
              </button>
              <div className='border-t my-1' />
              <button
                onClick={logout}
                className='w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors'
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
