import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import { TMDB_ENDPOINTS } from '../services/tmdb';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900">
      <Header />
      
      <main className="pt-16">
        <Banner />
        
        <div className="py-8 space-y-8">
          <MovieRow 
            title="Trending Now" 
            fetchUrl={TMDB_ENDPOINTS.trending}
            isLargeRow={true}
          />
          
          <MovieRow 
            title="Netflix Originals" 
            fetchUrl={TMDB_ENDPOINTS.netflixOriginals}
          />
          
          <MovieRow 
            title="Top Rated" 
            fetchUrl={TMDB_ENDPOINTS.topRated}
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

export default HomePage;