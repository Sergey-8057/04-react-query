import axios from 'axios';
import type { Movie } from '../types/movie.ts';

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

const BASE_URL: string = 'https://api.themoviedb.org/3/search/movie';
const TMDB_TOKEN: string = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(
  query: string,
  page: number
): Promise<{ movies: Movie[]; total_pages: number }> {
  const response = await axios.get<MoviesHttpResponse>(BASE_URL, {
    params: {
      query: query,
      page,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  });
  const { results, total_pages } = response.data;
  // console.log(results);

  return {
    movies: results.map(movie => ({
      id: movie.id,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    })),
    total_pages,
  };
}
