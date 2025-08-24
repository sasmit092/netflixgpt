const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// API key is loaded from environment variables
// Make sure VITE_TMDB_API_KEY is set in your .env file

export const TMDB_ENDPOINTS = {
  trending: `/trending/all/week?api_key=${API_KEY}`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  topRated: `/movie/top_rated?api_key=${API_KEY}`,
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  search: (query: string) => `/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  movieDetails: (id: number) => `/movie/${id}?api_key=${API_KEY}`,
  movieVideos: (id: number) => `/movie/${id}/videos?api_key=${API_KEY}`,
  tvVideos: (id: number) => `/tv/${id}/videos?api_key=${API_KEY}`,
};

export const getImageUrl = (path: string, size: string = 'w500') => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string) => {
  return `${IMAGE_BASE_URL}/w1280${path}`;
};

export const fetchFromTMDB = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    throw error;
  }
};

export const searchMovies = async (query: string) => {
  if (!query.trim()) return { results: [] };
  return fetchFromTMDB(TMDB_ENDPOINTS.search(query));
};

export const getMovieTrailer = async (movieId: number, mediaType: 'movie' | 'tv' = 'movie') => {
  try {
    const endpoint = mediaType === 'movie' 
      ? TMDB_ENDPOINTS.movieVideos(movieId)
      : TMDB_ENDPOINTS.tvVideos(movieId);
    
    const response = await fetchFromTMDB(endpoint);
    const trailer = response.results?.find(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    return trailer?.key || null;
  } catch (error) {
    console.error('Error fetching trailer:', error);
    return null;
  }
};