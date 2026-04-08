import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Share2, Download, MoreVertical } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

export default function VideoDetailPage() {
  const [video, setVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock video data - in real app, should fetch from API
    setVideo({
      id: 1,
      title: 'Amazing Documentary about Space',
      description: 'A fascinating journey through the cosmos...',
      duration: 3600,
      views: 1250000,
      likes: 85000,
      uploader: 'DocuChannel',
      category: 'Documentary',
      uploadedAt: '2 weeks ago',
      thumbnail: ''
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-dark-900 min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        {/* Video Player */}
        <div className="mb-8">
          <VideoPlayer videoUrl="" videoDuration={video.duration} />
        </div>

        {/* Video Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-white mb-4">{video.title}</h1>

            {/* Stats and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-dark-700">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <span className="text-gray-400">{video.views.toLocaleString()} views</span>
                <span className="text-gray-400">{video.uploadedAt}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-dark-700 transition ${
                    isLiked ? 'text-red-600' : 'text-gray-300'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{video.likes.toLocaleString()}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-dark-700 text-gray-300 transition">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>

                <button className="p-2 rounded hover:bg-dark-700 text-gray-300 transition">
                  <Download size={20} />
                </button>

                <button className="p-2 rounded hover:bg-dark-700 text-gray-300 transition">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Uploader Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-dark-700">
              <div className="w-12 h-12 rounded-full bg-dark-700"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{video.uploader}</h3>
                <p className="text-gray-400 text-sm">Verified • 250K subscribers</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition">
                Subscribe
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{video.description}</p>
            </div>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4">Recommended</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 hover:bg-dark-800 p-2 rounded cursor-pointer transition">
                  <div className="w-28 h-16 bg-dark-700 rounded flex-shrink-0 flex items-center justify-center">
                    <span className="text-red-600 text-lg">▶</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">Recommended Video {i}</p>
                    <p className="text-gray-400 text-xs">Channel {i}</p>
                    <p className="text-gray-400 text-xs">250K views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
