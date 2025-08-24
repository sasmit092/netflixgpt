import React from 'react';
import Header from '../components/Header';
import MovieRow from '../components/MovieRow';
import { TMDB_ENDPOINTS } from '../services/tmdb';

const TVShowsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900">
      <Header />
      
      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4 lg:px-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">TV Shows</h1>
          <p className="text-gray-300 text-lg">Explore popular TV series and originals</p>
        </div>
        
        <div className="space-y-8">
          <MovieRow 
            title="Netflix Originals" 
            fetchUrl={TMDB_ENDPOINTS.netflixOriginals}
            isLargeRow={true}
          />
          
          <MovieRow 
            title="Trending TV Shows" 
            fetchUrl={TMDB_ENDPOINTS.trending}
          />
        </div>
      </main>
    </div>
  );
};

export default TVShowsPage;