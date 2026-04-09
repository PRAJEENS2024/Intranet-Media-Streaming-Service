import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, User as UserIcon, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useDebounce } from '../hooks/useDebounce';
import axios from 'axios';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveResults, setLiveResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim()) {
        try {
          const res = await axios.get(`/api/videos?search=${encodeURIComponent(debouncedSearch)}`);
          setLiveResults(res.data.slice(0, 5));
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error", error);
        }
      } else {
        setLiveResults([]);
        setShowDropdown(false);
      }
    };
    fetchResults();
  }, [debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neon-cyan/10 dark:bg-neon-cyan/10 rounded flex items-center justify-center border border-neon-cyan shadow-neon-cyan">
            <span className="text-neon-cyan font-bold text-lg">▶</span>
          </div>
          <span className="text-gray-900 dark:text-white font-bold text-xl hidden sm:inline tracking-wider">IMSS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan transition font-medium">Home</Link>
              <Link to="/browse" className="text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan transition font-medium">Browse</Link>
              <Link to="/my-videos" className="text-gray-600 dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan transition font-medium">My Videos</Link>
              
              <div ref={wrapperRef} className="relative flex items-center hidden lg:flex mr-2">
                <form onSubmit={handleSearch} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { if (searchQuery.trim()) setShowDropdown(true); }}
                    className="bg-gray-100 dark:bg-dark-900 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-dark-600 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-neon-cyan dark:focus:border-neon-cyan focus:shadow-neon-cyan w-48 transition-all focus:w-64"
                  />
                  <button type="submit" className="absolute right-3 top-2 text-gray-400 hover:text-neon-cyan">
                    <Search size={16} />
                  </button>
                </form>
                
                {/* Live Search Results Dropdown */}
                {showDropdown && liveResults.length > 0 && (
                  <div className="absolute top-12 left-0 w-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-lg shadow-xl overflow-hidden z-50">
                    {liveResults.map(video => (
                      <Link 
                        key={video.id} 
                        to={`/video/${video.id}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-700 transition"
                      >
                        <div className="w-12 h-8 bg-gray-200 dark:bg-dark-900 rounded overflow-hidden flex-shrink-0">
                          {video.thumbnail_url ? (
                            <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neon-cyan text-xs font-bold">VS</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{video.title}</p>
                        </div>
                      </Link>
                    ))}
                    <Link to={`/search?q=${encodeURIComponent(searchQuery)}`} onClick={() => setShowDropdown(false)} className="block px-4 py-2 text-center text-sm text-neon-cyan hover:bg-gray-50 dark:hover:bg-dark-700 transition border-t border-gray-200 dark:border-dark-700">
                      View all results
                    </Link>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 border-l border-gray-300 dark:border-dark-600 pl-4">
                <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-neon-purple dark:hover:text-neon-purple transition p-1">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center group-hover:shadow-neon-cyan transition border border-transparent group-hover:border-neon-cyan">
                    <UserIcon size={16} className="text-gray-600 dark:text-gray-300 group-hover:text-neon-cyan" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition text-sm font-medium">{user?.username}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 text-sm hover:text-neon-pink transition px-2">Logout</button>
              </div>
            </>
          ) : (
            <>
              <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-neon-purple dark:hover:text-neon-purple transition p-1">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition">Login</Link>
              <Link to="/register" className="bg-transparent border border-neon-cyan text-neon-cyan px-4 py-2 rounded hover:bg-neon-cyan hover:text-dark-900 hover:shadow-neon-cyan transition font-bold tracking-wide">Sign Up</Link>
            </>
          )}
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-neon-purple transition p-1">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-gray-900 dark:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-gray-100 dark:bg-dark-700 px-4 py-2 space-y-2 border-t border-gray-200 dark:border-dark-600">
          {isAuthenticated ? (
            <>
              <Link to="/" className="block text-gray-600 dark:text-gray-300 hover:text-neon-cyan py-2 font-medium">Home</Link>
              <Link to="/browse" className="block text-gray-600 dark:text-gray-300 hover:text-neon-cyan py-2 font-medium">Browse</Link>
              <Link to="/my-videos" className="block text-gray-600 dark:text-gray-300 hover:text-neon-cyan py-2 font-medium">My Videos</Link>
              <button onClick={handleLogout} className="w-full bg-transparent border border-neon-pink text-neon-pink shadow-[0_0_10px_rgba(255,0,255,0.2)] px-4 py-2 rounded font-bold tracking-wide hover:shadow-neon-pink transition mt-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2 font-medium">Login</Link>
              <Link to="/register" className="block bg-transparent border border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)] px-4 py-2 rounded hover:shadow-neon-cyan text-center font-bold tracking-wide transition mt-2">Sign Up</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
