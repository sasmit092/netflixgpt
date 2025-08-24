import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import YouTube from 'react-youtube';
import { getMovieTrailer } from '../services/tmdb';

interface TrailerModalProps {
  movieId: number;
  movieTitle: string;
  mediaType: 'movie' | 'tv';
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ movieId, movieTitle, mediaType, onClose }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const key = await getMovieTrailer(movieId, mediaType);
        setTrailerKey(key);
        if (!key) {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId, mediaType]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const youtubeOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 1,
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : error || !trailerKey ? (
          <div className="flex flex-col items-center justify-center h-full text-white space-y-4">
            <div className="text-6xl">🎬</div>
            <h3 className="text-2xl font-bold">{movieTitle}</h3>
            <p className="text-gray-300">Trailer not available</p>
          </div>
        ) : (
          <YouTube
            videoId={trailerKey}
            opts={youtubeOptions}
            className="w-full h-full"
            iframeClassName="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default TrailerModal;