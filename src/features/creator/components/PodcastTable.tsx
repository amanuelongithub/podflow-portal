import React, { useState } from 'react';
import { PodcastResponse } from '../model/podcast_model';
import { imageUrl } from "../../../core/config.ts";

import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical, HiOutlineSearch, HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi';
import { BsDownload } from 'react-icons/bs';
import Pagination from '../../../shared/components/Pagination.tsx';

interface PodcastTableProps {
  podcasts: PodcastResponse[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PodcastTable: React.FC<PodcastTableProps> = ({ 
  podcasts, 
  currentPage, 
  totalPages, 
  totalItems, 
  onPageChange 
}) => {
  const itemsPerPage = 10; // Assuming 10 based on example response size = 10

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-4">
      {/* Search and Action Bar */}
      <div className="p-4 flex justify-between items-center border-b border-gray-200 bg-white">
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-900 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium">
          <BsDownload />
          EXPORT ALL
        </button>

        <div className="flex items-center gap-4">
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-64"
            />
          </div>
          <div className="flex items-center gap-2 text-gray-400 border-l border-gray-200 pl-4 h-6">
            <button className="p-1 hover:text-gray-600"><HiOutlineViewList /></button>
            <button className="p-1 hover:text-gray-600"><HiOutlineViewGrid /></button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="p-4 w-4">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              <th scope="col" className="px-6 py-3 font-semibold">#</th>
              <th scope="col" className="px-6 py-3 font-semibold">IMAGE</th>
              <th scope="col" className="px-6 py-3 font-semibold">TITLE</th>
              <th scope="col" className="px-6 py-3 font-semibold">GUEST NAME</th>
              <th scope="col" className="px-6 py-3 font-semibold">TYPE</th>
              <th scope="col" className="px-6 py-3 font-semibold">STATUS</th>
              <th scope="col" className="px-6 py-3 font-semibold">DATE</th>
              <th scope="col" className="px-6 py-3 font-semibold">LIKES / COMMENTS</th>
              <th scope="col" className="px-6 py-3 font-semibold text-center bg-gray-100">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {podcasts.map((podcast, index) => (
              <tr 
                key={podcast.id} 
                className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 !== 0 ? 'bg-gray-50/50' : 'bg-white'}`}
              >
                <td className="p-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </td>
                <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-7 py-5">
                  <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={imageUrl + podcast.image_url || 'https://via.placeholder.com/40'}
                      alt={podcast.title || 'Podcast'}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{podcast.title || '-'}</td>
                <td className="px-6 py-4 text-gray-500">{podcast.guest_name || '-'}</td>
                <td className="px-6 py-4 text-gray-500 uppercase">{podcast.category?.name || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${podcast.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {podcast.is_published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td className="px-6 py-4">{podcast.created_at ? new Date(podcast.created_at).toISOString().split('T')[0] : '-'}</td>
                <td className="px-6 py-4 text-gray-500">
                  {podcast.like_count || 0} / {podcast.comment_count || 0}
                </td>
                <td className="px-6 py-4 text-center bg-gray-50/50">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                    <HiOutlineDotsVertical />
                  </button>
                </td>
              </tr>
            ))}
            
            {podcasts.length === 0 && (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                  No podcasts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PodcastTable;
