import React from 'react';
import Header from '../components/Header';
import MovieRow from '../components/MovieRow';
import { TMDB_ENDPOINTS } from '../services/tmdb';

const MoviesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900">
      <Header />
      
      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4 lg:px-8 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Movies</h1>
          <p className="text-gray-300 text-lg">Discover the best movies across all genres</p>
        </div>
        
        <div className="space-y-8">
          <MovieRow 
            title="Top Rated Movies" 
            fetchUrl={TMDB_ENDPOINTS.topRated}
            isLargeRow={true}
          />
          
          <MovieRow 
            title="Action Movies" 
            fetchUrl={TMDB_ENDPOINTS.actionMovies}
          />
          
          <MovieRow 
            title="Comedy Movies" 
            fetchUrl={TMDB_ENDPOINTS.comedyMovies}
          />
          
          <MovieRow 
            title="Horror Movies" 
            fetchUrl={TMDB_ENDPOINTS.horrorMovies}
          />
          
          <MovieRow 
            title="Romance Movies" 
            fetchUrl={TMDB_ENDPOINTS.romanceMovies}
          />
          
          <MovieRow 
            title="Documentaries" 
            fetchUrl={TMDB_ENDPOINTS.documentaries}
          />
        </div>
      </main>
    </div>
  );
};

export default MoviesPage;