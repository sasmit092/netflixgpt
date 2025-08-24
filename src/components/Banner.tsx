import React, { useState, useEffect } from 'react';
import { Play, Plus, Info } from 'lucide-react';
import { fetchFromTMDB, TMDB_ENDPOINTS, getBackdropUrl } from '../services/tmdb';
import { Movie } from '../types/movie';
import TrailerModal from './TrailerModal';

const Banner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        const response = await fetchFromTMDB(TMDB_ENDPOINTS.trending);
        const movies = response.results.filter((item: Movie) => item.backdrop_path);
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching banner movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerMovie();
  }, []);

  if (loading || !movie) {
    return (
      <div className="relative h-[70vh] md:h-[80vh] bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  const title = movie.title || movie.name;
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() 
    : movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : '';

  return (
    <>
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title}
              </h1>
              
              {releaseYear && (
                <div className="flex items-center space-x-4 text-white/80">
                  <span className="text-lg font-medium">{releaseYear}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              )}

              <p className="text-lg md:text-xl text-white/90 line-clamp-3 leading-relaxed">
                {movie.overview}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center justify-center space-x-2 bg-white text-black px-6 md:px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/90 transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Play</span>
                </button>
                
                <button className="flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-6 md:px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-600/90 transition-all duration-200 hover:scale-105">
                  <Plus className="w-5 h-5" />
                  <span>My List</span>
                </button>

                <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white/50 text-white px-6 md:px-8 py-3 rounded-lg font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-200">
                  <Info className="w-5 h-5" />
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          movieTitle={title || ''}
          mediaType={movie.media_type || 'movie'}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
};

export default Banner;