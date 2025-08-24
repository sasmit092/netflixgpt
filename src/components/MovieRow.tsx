import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react';
import { fetchFromTMDB, getImageUrl } from '../services/tmdb';
import { Movie } from '../types/movie';
import TrailerModal from './TrailerModal';

interface MovieRowProps {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchFromTMDB(fetchUrl);
        setMovies(response.results.filter((movie: Movie) => movie.poster_path));
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchUrl, title]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

  if (loading) {
    return (
      <div className="px-4 lg:px-8 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className={`flex-shrink-0 bg-gray-700 rounded-lg animate-pulse ${
                isLargeRow ? 'w-48 h-72' : 'w-40 h-60'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 lg:px-8 mb-8 group">
        <h2 className="text-xl md:text-2xl font-bold text-white dark:text-white mb-4">
          {title}
        </h2>
        
        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-r-md opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Movies container */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-scroll scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {movies.map((movie) => {
              const title = movie.title || movie.name;
              return (
                <div
                  key={movie.id}
                  className="flex-shrink-0 group/movie cursor-pointer"
                  onMouseEnter={() => setHoveredMovie(movie.id)}
                  onMouseLeave={() => setHoveredMovie(null)}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className={`relative overflow-hidden rounded-lg transition-all duration-300 group-hover/movie:scale-105 ${
                    isLargeRow ? 'w-48 h-72' : 'w-40 h-60'
                  }`}>
                    <img
                      src={getImageUrl(movie.poster_path, isLargeRow ? 'w500' : 'w342')}
                      alt={title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Hover overlay */}
                    <div className={`absolute inset-0 bg-black/60 opacity-0 group-hover/movie:opacity-100 transition-opacity duration-300 flex items-center justify-center ${
                      hoveredMovie === movie.id ? 'opacity-100' : ''
                    }`}>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                        <button className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Movie info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover/movie:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-medium text-sm line-clamp-2">
                        {title}
                      </h3>
                      <div className="flex items-center mt-1 text-xs text-white/80">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-l-md opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showTrailer && selectedMovie && (
        <TrailerModal
          movieId={selectedMovie.id}
          movieTitle={selectedMovie.title || selectedMovie.name || ''}
          mediaType={selectedMovie.media_type || 'movie'}
          onClose={() => {
            setShowTrailer(false);
            setSelectedMovie(null);
          }}
        />
      )}
    </>
  );
};

export default MovieRow;