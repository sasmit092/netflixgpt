import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Sun, Moon, Film } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchVisible(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 dark:bg-black/90 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Film className="w-8 h-8 text-red-600 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors duration-200">
              MovieWeb
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-white hover:text-red-500 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="text-white hover:text-red-500 transition-colors duration-200 font-medium"
            >
              Movies
            </Link>
            <Link 
              to="/tv-shows" 
              className="text-white hover:text-red-500 transition-colors duration-200 font-medium"
            >
              TV Shows
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchVisible ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className="w-48 md:w-64 px-4 py-2 bg-black/70 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoFocus
                    onBlur={() => !searchQuery && setIsSearchVisible(false)}
                  />
                  <button type="submit" className="ml-2 p-2 text-white hover:text-red-500">
                    <Search className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchVisible(true)}
                  className="p-2 text-white hover:text-red-500 transition-colors duration-200"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:text-red-500 transition-colors duration-200"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile */}
            <div className="relative">
              <button className="p-2 text-white hover:text-red-500 transition-colors duration-200">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;