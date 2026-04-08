import React, { useState, useEffect } from 'react';
import { Zap, Loading } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { useVideos, useContinueWatching } from '../hooks/useAPI';

export default function HomePageIntegrated() {
  const { videos: allVideos, loading: videosLoading } = useVideos();
  const { videos: continueList, loading: continueLoading } = useContinueWatching();
  const [trendingVideos, setTrendingVideos] = useState([]);

  useEffect(() => {
    // Sort videos by view count for trending
    if (allVideos.length > 0) {
      setTrendingVideos([...allVideos].sort((a, b) => (b.views_count || 0) - (a.views_count || 0)).slice(0, 8));
    }
  }, [allVideos]);

  const handleVideoClick = (videoId) => {
    // Navigate to video detail page
    window.location.href = `/video/${videoId}`;
  };

  const handleLike = (videoId) => {
    console.log('Liked video:', videoId);
    // Call API to like video
  };

  return (
    <div className="bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-red-600 to-red-800 overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Featured video thumbnail */}
        {allVideos.length > 0 && allVideos[0].thumbnail_url && (
          <img
            src={allVideos[0].thumbnail_url}
            alt={allVideos[0].title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}

        <div className="relative h-full flex items-center px-4 sm:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {allVideos.length > 0 ? allVideos[0].title : 'Welcome to IMSS'}
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              {allVideos.length > 0
                ? allVideos[0].description?.substring(0, 100) + '...'
                : 'Stream unlimited videos and content on demand'}
            </p>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition">
              <span>▶</span>
              Play Now
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4 sm:p-8">
        {/* Continue Watching */}
        {continueList.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="text-yellow-500" />
              Continue Watching
            </h2>
            {continueLoading ? (
              <div className="text-gray-400">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {continueList.slice(0, 4).map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={() => handleVideoClick(video.id)}
                    onLike={handleLike}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Trending */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Trending Now
          </h2>
          {videosLoading ? (
            <div className="text-gray-400">Loading videos...</div>
          ) : trendingVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoClick(video.id)}
                  onLike={handleLike}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No videos available</div>
          )}
        </div>

        {/* All Videos */}
        {allVideos.length > trendingVideos.length && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">More Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allVideos.slice(8, 16).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleVideoClick(video.id)}
                  onLike={handleLike}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
