import axios from 'axios';
import type { Movie } from '../types/movie.ts';

interface MoviesHttpResponse {
  results: Movie[];
}

const BASE_URL: string = 'https://api.themoviedb.org/3/search/movie';
const TMDB_TOKEN: string = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<MoviesHttpResponse>(BASE_URL, {
    params: {
      query: query,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });

  const { results } = response.data;

  return results.map(movie => ({
    id: movie.id,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  }));
}
