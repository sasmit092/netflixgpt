import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Plus, Star } from 'lucide-react';
import Header from '../components/Header';
import TrailerModal from '../components/TrailerModal';
import { searchMovies, getImageUrl } from '../services/tmdb';
import { Movie } from '../types/movie';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const response = await searchMovies(searchQuery);
      setMovies(response.results.filter((item: Movie) => item.poster_path));
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowTrailer(true);
  };

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        
        <main className="pt-24 pb-8">
          <div className="container mx-auto px-4 lg:px-8">
            {query && (
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Search Results for "{query}"
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {loading ? 'Searching...' : `${movies.length} results found`}
                </p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[...Array(12)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : movies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {movies.map((movie) => {
                  const title = movie.title || movie.name;
                  const year = movie.release_date 
                    ? new Date(movie.release_date).getFullYear()
                    : movie.first_air_date 
                    ? new Date(movie.first_air_date).getFullYear()
                    : '';

                  return (
                    <div
                      key={movie.id}
                      className="group cursor-pointer"
                      onClick={() => handleMovieClick(movie)}
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={getImageUrl(movie.poster_path)}
                          alt={title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="flex space-x-2">
                            <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
                              <Play className="w-4 h-4 fill-current" />
                            </button>
                            <button className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 space-y-1">
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm">
                          {title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>{year}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span>{movie.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : query && !loading ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No results found
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Try searching for something else
                </p>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎬</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Search for movies and TV shows
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Use the search bar above to find your favorite content
                </p>
              </div>
            )}
          </div>
        </main>
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

export default SearchPage;