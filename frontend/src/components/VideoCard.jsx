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
      className="bg-white dark:bg-dark-800 rounded-lg overflow-hidden border border-gray-200 dark:border-dark-700 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:border-transparent transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 dark:bg-dark-700 flex items-center justify-center overflow-hidden">
        {video.thumbnail_url && (
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-transparent group-hover:bg-neon-cyan/10 transition-colors flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm shadow-[0_0_10px_rgba(0,243,255,0.8)] border border-neon-cyan rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={24} className="text-neon-cyan ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-gray-900/80 px-2 py-1 rounded text-xs text-white shadow-md font-medium">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-neon-cyan transition text-md">
          {video.title}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
          {video.uploader_name || 'Unknown Channel'}
        </p>

        <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
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

        <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
          {formatDate(video.created_at)}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike && onLike(video.id);
          }}
          className="mt-2 text-gray-400 hover:text-neon-pink group/like flex items-center gap-1 transition text-xs font-bold"
        >
          <Heart size={14} className="group-hover/like:drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" />
          <span>Like</span>
        </button>
      </div>
    </div>
  );
}
