export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: 'movie' | 'tv';
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface VideoResponse {
  results: Video[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}