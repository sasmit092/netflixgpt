import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import MoviesPage from './pages/MoviesPage';
import TVShowsPage from './pages/TVShowsPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv-shows" element={<TVShowsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;