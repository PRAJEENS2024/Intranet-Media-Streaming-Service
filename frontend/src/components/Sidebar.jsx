import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-dark-800 border-r border-dark-700 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-white font-bold text-lg mb-4">Categories</h2>
        <nav className="space-y-2">
          <a href="#" className="block px-3 py-2 rounded hover:bg-dark-700 text-gray-300 hover:text-white transition">
            Action
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-dark-700 text-gray-300 hover:text-white transition">
            Comedy
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-dark-700 text-gray-300 hover:text-white transition">
            Drama
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-dark-700 text-gray-300 hover:text-white transition">
            Documentary
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-dark-700 text-gray-300 hover:text-white transition">
            Technology
          </a>
          <a href="#" className="block px-3 py-2 rounded hover:bg-dark-700 text-gray-300 hover:text-white transition">
            Educational
          </a>
        </nav>
      </div>
    </aside>
  );
}
