import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Heart, Share2, Download, MoreVertical, Play } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';

export default function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const { data } = await axios.get(`/api/videos/info/${id}`);
        setVideo(data.video);
        
        setLikesCount(10); 
        
        try {
           const likeStatus = await axios.get(`/api/engagement/like-status/${id}`);
           setIsLiked(likeStatus.data.liked);
        } catch(e) {}
        
        try {
           await axios.post(`/api/engagement/watch-record`, { videoId: id });
        } catch(e) {}
        
      } catch (err) {
        console.error("Failed to load video details:", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchVideoData();
    }
  }, [id]);

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await axios.post(`/api/engagement/unlike`, { videoId: id });
        setIsLiked(false);
        setLikesCount(prev => prev - 1);
      } else {
        await axios.post(`/api/engagement/like`, { videoId: id });
        setIsLiked(true);
        setLikesCount(prev => prev + 1);
      }
    } catch(err) {
      console.error('Failed to toggle like');
    }
  };

  if (loading) {
    return <div className="text-gray-900 dark:text-white p-8">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Video Player */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-dark-700">
          {video?.id && (
            <VideoPlayer videoUrl={`/api/videos/stream/${video.id}`} videoDuration={video.duration || 0} />
          )}
        </div>

        {/* Video Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{video.title}</h1>

            {/* Stats and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-300 dark:border-dark-700">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <span className="text-gray-600 dark:text-gray-400 font-medium">{(video.views_count || 0).toLocaleString()} views</span>
                <span className="text-gray-600 dark:text-gray-400">{new Date(video.created_at).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${
                    isLiked ? 'text-neon-pink bg-neon-pink/10 shadow-[0_0_10px_rgba(255,0,255,0.2)]' : 'text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 hover:text-neon-pink'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} className={isLiked ? "drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" : ""} />
                  <span>{likesCount}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 hover:text-neon-cyan transition border border-transparent hover:border-neon-cyan/50">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>

                <button className="p-2 rounded-full bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 hover:text-neon-purple transition border border-transparent hover:border-neon-purple/50">
                  <Download size={20} />
                </button>

                <button className="p-2 rounded-full bg-gray-200 dark:bg-dark-800 hover:bg-gray-300 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300 transition">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Uploader Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-300 dark:border-dark-700">
              <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center font-bold text-neon-cyan text-xl border border-neon-cyan shadow-neon-cyan">
                 {video.uploader_name ? video.uploader_name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{video.uploader_name || 'Unknown'}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Verified</p>
              </div>
              <button className="bg-transparent border border-neon-purple text-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.2)] hover:shadow-neon-purple hover:bg-neon-purple hover:text-white px-6 py-2 rounded-full font-bold tracking-wide transition">
                Subscribe
              </button>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-dark-800 p-6 rounded-xl border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{video.description}</p>
            </div>
          </div>

          {/* Sidebar - Recommendations */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recommended</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3 hover:bg-white dark:hover:bg-dark-800 p-2 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-dark-700 hover:shadow-sm cursor-pointer transition group">
                  <div className="w-32 h-20 bg-gray-200 dark:bg-dark-700 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                    <Play size={24} className="text-gray-400 group-hover:text-neon-cyan transition z-10" />
                    <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition"></div>
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <p className="text-gray-900 dark:text-white text-sm font-semibold truncate group-hover:text-neon-cyan transition">Recommended Video {i}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Channel {i}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">250K views</p>
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
