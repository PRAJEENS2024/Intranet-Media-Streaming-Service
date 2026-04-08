import React from 'react';
import { Play, Heart, Clock } from 'lucide-react';

export default function VideoCard({ video, onClick, onLike }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-dark-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-dark-700 flex items-center justify-center overflow-hidden">
        {video.thumbnail_url && (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={24} className="text-white ml-0.5" fill="white" />
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-white truncate hover:text-red-500 transition">
          {video.title}
        </h3>

        <p className="text-xs text-gray-400 truncate mt-1">
          {video.uploader_name || 'Unknown Channel'}
        </p>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>{video.views_count?.toLocaleString() || 0} views</span>
            {video.category_name && (
              <>
                <span>•</span>
                <span>{video.category_name}</span>
              </>
            )}
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500">
          {formatDate(video.created_at)}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike && onLike(video.id);
          }}
          className="mt-2 flex items-center gap-1 text-gray-400 hover:text-red-600 transition text-xs"
        >
          <Heart size={14} />
          <span>Like</span>
        </button>
      </div>
    </div>
  );
}
