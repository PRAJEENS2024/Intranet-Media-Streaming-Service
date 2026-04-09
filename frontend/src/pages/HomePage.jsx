import React from 'react';
import { Zap, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-cyan opacity-80 mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute inset-0 bg-gray-900 dark:bg-black opacity-30"></div>
        <div className="relative h-full flex items-center px-4 sm:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              Welcome to IMSS
            </h1>
            <p className="text-lg text-gray-100 mb-8 font-medium">
              Stream unlimited videos and content on demand
            </p>
            <button className="flex items-center gap-2 bg-neon-cyan/90 hover:bg-neon-cyan text-gray-900 px-6 py-3 rounded font-bold shadow-neon-cyan hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transition-all">
              <Play size={20} className="fill-current" />
              Start Watching
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4 sm:p-8">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="text-neon-cyan" />
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-700 overflow-hidden hover:scale-[1.02] hover:shadow-neon-purple hover:border-transparent transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-gray-200 dark:bg-dark-700 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-dark-600 transition">
                  <Play className="text-gray-400 group-hover:text-neon-purple transition" size={48} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-neon-cyan transition">Video Title {i}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category • 2.5M views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-700 overflow-hidden hover:scale-[1.02] hover:shadow-neon-cyan hover:border-transparent transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video bg-gray-200 dark:bg-dark-700 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-dark-600 transition">
                  <Play className="text-gray-400 group-hover:text-neon-cyan transition" size={48} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-neon-cyan transition">Popular Video {i}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category • 1.2M views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
