import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 h-screen sticky top-0 overflow-y-auto transition-colors duration-300">
      <div className="p-4">
        <h2 className="text-gray-900 dark:text-white font-bold text-lg mb-4 tracking-wide">Categories</h2>
        <nav className="space-y-2">
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan font-medium transition">
            Action
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan font-medium transition">
            Comedy
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan font-medium transition">
            Drama
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan font-medium transition">
            Documentary
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan font-medium transition">
            Technology
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan font-medium transition">
            Educational
          </a>
        </nav>
      </div>
    </aside>
  );
}
