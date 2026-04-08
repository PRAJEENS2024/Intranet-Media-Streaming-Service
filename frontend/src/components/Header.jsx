import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">▶</span>
          </div>
          <span className="text-white font-bold text-lg hidden sm:inline">IMSS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Home
              </Link>
              <Link to="/browse" className="text-gray-300 hover:text-white transition">
                Browse
              </Link>
              <Link to="/my-videos" className="text-gray-300 hover:text-white transition">
                My Videos
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition">
                Login
              </Link>
              <Link to="/register" className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-dark-700 px-4 py-2 space-y-2">
          {isAuthenticated ? (
            <>
              <Link to="/" className="block text-gray-300 hover:text-white py-2">
                Home
              </Link>
              <Link to="/browse" className="block text-gray-300 hover:text-white py-2">
                Browse
              </Link>
              <Link to="/my-videos" className="block text-gray-300 hover:text-white py-2">
                My Videos
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-300 hover:text-white py-2">
                Login
              </Link>
              <Link to="/register" className="block bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
