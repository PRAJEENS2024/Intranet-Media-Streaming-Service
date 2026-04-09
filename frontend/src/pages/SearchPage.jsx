import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryInfo = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/videos/browse?search=${encodeURIComponent(queryInfo || '')}`);
        setVideos(response.data.videos || []);
      } catch (err) {
        console.error('Error fetching search results', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [queryInfo]);

  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Search className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" size={32} />
          Search results for "<span className="text-neon-purple">{queryInfo}</span>"
        </h1>

        {loading ? (
          <div className="text-gray-500 dark:text-gray-400 text-xl font-medium animate-pulse">Searching videos...</div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 dark:text-gray-500">
            <Search className="mx-auto h-16 w-16 opacity-30 mb-4" />
            <p className="text-xl font-medium text-gray-500 dark:text-gray-400">No videos found for "{queryInfo}"</p>
            <p className="text-sm mt-2">Try adjusting your keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
