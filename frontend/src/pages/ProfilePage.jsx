import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Clock, Heart, User, Film, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [historyRes, likesRes] = await Promise.all([
          axios.get('/api/engagement/watch-history'),
          axios.get('/api/engagement/liked-videos')
        ]);
        setHistory(historyRes.data.history || []);
        setLikes(likesRes.data.videos || []);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <div className="text-gray-900 dark:text-white p-8">Loading profile...</div>;
  if (!user) return null;

  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen p-6 lg:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-200 dark:border-dark-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple to-neon-cyan"></div>
          <div className="w-32 h-32 bg-neon-purple/20 border-2 border-neon-purple rounded-full flex items-center justify-center text-5xl font-bold text-neon-purple shadow-[0_0_15px_rgba(188,19,254,0.3)]">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left text-gray-900 dark:text-white">
            <h1 className="text-4xl font-bold mb-2 tracking-tight">{user.full_name || user.username}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <div className="bg-gray-100 dark:bg-dark-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-200 dark:border-transparent">
                <User size={18} className="text-neon-cyan" />
                <span className="text-gray-700 dark:text-gray-300">Role: <span className="font-bold text-gray-900 dark:text-white capitalize">{user.role}</span></span>
              </div>
              <div className="bg-gray-100 dark:bg-dark-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-200 dark:border-transparent">
                <Heart size={18} className="text-neon-pink" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{likes.length} Liked Videos</span>
              </div>
              <div className="bg-gray-100 dark:bg-dark-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-200 dark:border-transparent">
                <Clock size={18} className="text-neon-purple" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{history.length} Watched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Watch History */}
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-dark-700 pb-3">
              <Clock className="text-neon-purple" /> Watch History
            </h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length > 0 ? history.map((item) => (
                <Link to={`/video/${item.video_id}`} key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-dark-600 transition group">
                  <div className="w-32 h-20 bg-gray-200 dark:bg-dark-900 rounded-lg relative overflow-hidden flex-shrink-0">
                    {item.thumbnail_url ? (
                      <img src={item.thumbnail_url} alt="thumbnail" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-dark-700">
                        <PlayCircle size={24} className="text-gray-400 group-hover:text-neon-purple transition" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 py-1">
                    <h3 className="text-gray-900 dark:text-white font-medium line-clamp-2 group-hover:text-neon-purple transition">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">Watched {new Date(item.watched_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              )) : (
                <div className="text-gray-500 dark:text-gray-400 py-10 text-center flex flex-col items-center">
                  <Film size={48} className="opacity-20 mb-3" />
                  <p>Your watch history is empty.</p>
                </div>
              )}
            </div>
          </div>

          {/* Liked Videos */}
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-dark-700 pb-3">
              <Heart className="text-neon-pink" /> Liked Videos
            </h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {likes.length > 0 ? likes.map((item) => (
                <Link to={`/video/${item.video_id}`} key={item.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-dark-600 transition group">
                  <div className="w-32 h-20 bg-gray-200 dark:bg-dark-900 rounded-lg relative overflow-hidden flex-shrink-0">
                    {item.thumbnail_url ? (
                      <img src={item.thumbnail_url} alt="thumbnail" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-dark-700">
                        <PlayCircle size={24} className="text-gray-400 group-hover:text-neon-pink transition" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 py-1">
                    <h3 className="text-gray-900 dark:text-white font-medium line-clamp-2 group-hover:text-neon-pink transition">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">Liked {new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              )) : (
                <div className="text-gray-500 dark:text-gray-400 py-10 text-center flex flex-col items-center">
                  <Heart size={48} className="opacity-20 mb-3 text-neon-pink" />
                  <p>You haven't liked any videos yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
