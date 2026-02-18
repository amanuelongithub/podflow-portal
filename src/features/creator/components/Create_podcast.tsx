import React, { useState, ChangeEvent } from "react";
import Input from "../../../shared/components/Input.tsx";
import Button from "../../../shared/components/Button.tsx";
import { podcastController } from "../../creator/controller/podcast_controller.tsx";
import { useToast } from "../../../shared/components/Toast.js";
import { PodcastRequest } from "../model/podcast_model.ts";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../../../core/routes.ts";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreatePodcastModal: React.FC<Props> = ({ open, onClose }) => {
  const { createPodcast, isLoading } =
    podcastController();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    if (!title) {
      error("Title required");
      return;
    } else if (!description) {
      error("Description required");
      return;
    } else if (!category) {
      error("Selecte category");
      return;
    } else if (!audioFile) {
      error("Audio field required");
      return;
    } else if (!imageFile) {
      error("Image filed required");
      return;
    }

    const podcast: PodcastRequest = {
      title,
      description,
      audio_file: audioFile!,
      image_file: imageFile!,
      category_id: category,
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
    }     
    else {
      success("Podcast created successfully");
      setTitle("");
      setDescription("");
      setCategory("");
      setAudioFile(null);
      setImageFile(null);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div
        className='bg-white rounded-xl max-w-md w-full p-6 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Create Podcast
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
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

        {/* Form */}
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Podcast Title
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
              Description
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

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Category
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
              Audio File
            </label>
            <div className='relative'>
              <input
                type='file'
                accept='audio/*'
                // required={true}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setAudioFile(file);
                }}
                className='w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Cover Image
            </label>
            <div className='relative'>
              <input
                type='file'
                // required={true}
                accept='image/*'
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                }}
                className='w-full text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 cursor-pointer'
              />
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className='flex gap-3 mt-8'>
          <Button
            onClick={onClose}
            color='accent'
            fullWidth={false}
            className='flex-1'
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color='primary'
            fullWidth={false}
            className='flex-1'
            loading={isLoading}
          >
            Create Podcast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePodcastModal;
