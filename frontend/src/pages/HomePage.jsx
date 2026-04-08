import React from 'react';
import { Zap, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-dark-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-red-600 to-red-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative h-full flex items-center px-4 sm:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Welcome to IMSS
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Stream unlimited videos and content on demand
            </p>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition">
              <Play size={20} />
              Start Watching
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Trending Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-dark-800 rounded overflow-hidden hover:scale-105 transition cursor-pointer"
              >
                <div className="aspect-video bg-dark-700 flex items-center justify-center">
                  <Play className="text-gray-400" size={48} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">Video Title {i}</h3>
                  <p className="text-sm text-gray-400">Category • 2.5M views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Popular</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-dark-800 rounded overflow-hidden hover:scale-105 transition cursor-pointer"
              >
                <div className="aspect-video bg-dark-700 flex items-center justify-center">
                  <Play className="text-gray-400" size={48} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">Popular Video {i}</h3>
                  <p className="text-sm text-gray-400">Category • 1.2M views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
