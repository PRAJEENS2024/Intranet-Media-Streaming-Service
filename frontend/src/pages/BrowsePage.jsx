import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  return (
    <div className="bg-dark-900 min-h-screen p-4 sm:p-8">
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 border border-dark-700 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
            />
          </div>
          <button className="flex items-center gap-2 bg-dark-800 border border-dark-700 hover:border-red-600 text-white px-4 py-2 rounded transition">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {['All', 'Action', 'Comedy', 'Drama', 'Documentary', 'Tech'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded whitespace-nowrap transition ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-red-600 text-white'
                : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-dark-800 rounded overflow-hidden hover:scale-105 transition cursor-pointer"
          >
            <div className="aspect-video bg-dark-700 flex items-center justify-center">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white">▶</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2">Video Title {i + 1}</h3>
              <p className="text-xs text-gray-400 mb-3">Category • 1.2M views</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded">
                  45 min
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
