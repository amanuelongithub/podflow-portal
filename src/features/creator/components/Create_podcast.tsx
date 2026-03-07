import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import Input from "../../../shared/components/Input.tsx";
import Button from "../../../shared/components/Button.tsx";
import LoadingIndicator from "../../../shared/components/LoadingIndicator.tsx";
import { podcastController } from "../../creator/controller/podcast_controller.tsx";
import { useToast } from "../../../shared/components/Toast.js";
import { PodcastRequest } from "../model/podcast_model.ts";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../../core/routes.ts";

const CustomAudioPlayer = ({ url, fileName }: { url: string; fileName: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mt-3 w-full p-3 bg-orange-50 rounded-xl border border-orange-200 flex flex-col gap-2">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-orange-500 text-white rounded-full hover:bg-orange-600 shadow-sm transition-all active:scale-95"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 flex flex-col gap-1 overflow-hidden">
          <p className="text-sm font-medium text-orange-900 truncate" title={fileName}>{fileName}</p>
          <div className="flex items-center gap-2 text-xs text-orange-700">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 h-1.5 bg-orange-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-100" 
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreatePodcastModal: React.FC<Props> = ({ open, onClose }) => {
  const { createPodcast, isLoading } = podcastController();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [guestName, setGuestName] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [audioPreviewUrl, setAudioPreviewUrl] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  useEffect(() => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      setAudioPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAudioPreviewUrl("");
    }
  }, [audioFile]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreviewUrl("");
    }
  }, [imageFile]);

  const handleNextStep = () => {
    if (step === 1) {
      if (!title) {
        error("Title required");
        return;
      } else if (!description) {
        error("Description required");
        return;
      } else if (!category) {
        error("Select a category");
        return;
      }
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    if (!audioFile) {
      error("Audio field required");
      return;
    } else if (!imageFile) {
      error("Image field required");
      return;
    }

    const podcast: PodcastRequest = {
      title,
      description,
      audio_file: audioFile,
      image_file: imageFile,
      category_id: category,
      guest_name: guestName,
    };

    console.log("Podcast data creating");
    await createPodcast(podcast);
    console.log("Podcast data created");

    const state = podcastController.getState();

    if (state.isError) {
      error(state.errorMessage);
    } else if (state.unAuthorized) {
      error(state.errorMessage);
      navigate(loginRoute, { replace: true });
    } else {
      success("Podcast created successfully");
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setGuestName("");
    setAudioFile(null);
    setImageFile(null);
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      {isLoading && <LoadingIndicator fullScreen={true} text="Creating podcast..." />}
      <div
        className='bg-white rounded-xl max-w-md w-full p-6 shadow-2xl flex flex-col max-h-[90vh]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Create Podcast <span className="text-sm font-normal text-gray-500 ml-2">Step {step} of 2</span>
          </h2>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            disabled={isLoading}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="flex gap-2 mb-6">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
        </div>

        {/* Form Body - scrollable if needed */}
        <div className='overflow-y-auto pr-1 custom-scrollbar space-y-4 flex-1'>
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Podcast Title <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder='Enter podcast title'
                  value={title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Guest Name <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                </label>
                <Input
                  placeholder='Enter guest name'
                  value={guestName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setGuestName(e.target.value)
                  }
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  className='w-full h-11 px-4 py-2 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 appearance-none'
                  value={category}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setCategory(e.target.value)
                  }
                >
                  <option value='' className='text-gray-400'>
                    Select category
                  </option>
                  <option value='1'>Technology</option>
                  <option value='2'>Education</option>
                  <option value='3'>Business</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className='w-full h-32 px-4 py-3 rounded-lg border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 resize-none'
                  placeholder='Describe your podcast'
                  value={description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Cover Image <span className="text-red-500">*</span>
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setImageFile(file);
                    }}
                    className='w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer'
                  />
                </div>
                {imagePreviewUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 h-40 flex items-center justify-center bg-gray-50">
                    <img src={imagePreviewUrl} alt="Cover Preview" className="h-full object-contain" />
                  </div>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Audio File <span className="text-red-500">*</span>
                </label>
                <div className='relative flex items-center gap-2'>
                  <input
                    type='file'
                    accept='audio/*'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setAudioFile(file);
                    }}
                    className='w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer'
                  />
                </div>
                {audioPreviewUrl && (
                  <CustomAudioPlayer url={audioPreviewUrl} fileName={audioFile?.name || "Audio File"} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className='flex gap-3 mt-6 pt-4 border-t border-gray-100'>
          {step === 1 && (
             <Button
               onClick={handleClose}
               color='accent'
               fullWidth={false}
               className='flex-1 py-2.5'
             >
               Cancel
             </Button>
          )}
          {step === 2 && (
             <Button
               onClick={handlePrevStep}
               color='accent'
               fullWidth={false}
               className='flex-1 py-2.5'
             >
               Back
             </Button>
          )}
          {step === 1 && (
             <Button
               onClick={handleNextStep}
               color='primary'
               fullWidth={false}
               className='flex-1 py-2.5'
             >
               Next Step
             </Button>
          )}
          {step === 2 && (
             <Button
               onClick={handleSubmit}
               color='primary'
               fullWidth={false}
               className='flex-1 py-2.5'
               loading={isLoading}
             >
               Create Podcast
             </Button>
          )}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CreatePodcastModal;
