import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen p-4 sm:p-8 transition-colors duration-300">
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
              className="w-full bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded px-4 py-2 pl-10 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 hover:border-neon-purple text-gray-600 dark:text-gray-300 hover:text-neon-purple px-4 py-2 rounded transition font-medium">
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
            className={`px-4 py-2 rounded whitespace-nowrap transition font-medium ${
              selectedCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-neon-cyan text-gray-900 shadow-neon-cyan'
                : 'bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan hover:border-neon-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-700 overflow-hidden hover:scale-[1.02] hover:shadow-neon-cyan transition-all duration-300 cursor-pointer group"
          >
            <div className="aspect-video bg-gray-200 dark:bg-dark-700 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-dark-600 transition">
              <div className="w-12 h-12 bg-neon-cyan/20 rounded-full flex items-center justify-center border border-neon-cyan group-hover:shadow-neon-cyan transition">
                <span className="text-neon-cyan font-bold">▶</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-neon-cyan transition">Video Title {i + 1}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Category • 1.2M views</p>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded border border-gray-200 dark:border-dark-600">
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
