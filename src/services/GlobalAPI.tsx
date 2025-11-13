import Axios from "axios";

const MovieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "6d7c6b2863346e87e77d5294490e79d3";

const getAllMovies = ( page = 1) => {
  return Axios.get(`${MovieBaseUrl}/discover/movie?api_key=${api_key}`);
};
const getTrendingMovies = () => {
  return Axios.get(`${MovieBaseUrl}/trending/all/day?api_key=${api_key}`);
};
const getNewReleaseMovies = () => {
  return Axios.get(`${MovieBaseUrl}/movie/now_playing?api_key=${api_key}`);
}
const getSearchMovies = (query: string) => {
  return Axios
    .get(`${MovieBaseUrl}/search/movie?api_key=${api_key}&query=${query}`);
}
const getMovieDetails = (id: number | string) => {
  return Axios.get(`${MovieBaseUrl}/movie/${id}?api_key=${api_key}&language=en-US`);
};
const getMoviesByGenre = (genreId: number, page = 1) => {
  return Axios.get(
    `${MovieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${genreId}&page=${page}`
  );
};

const getGenres = () => {
  return Axios.get(`${MovieBaseUrl}/genre/movie/list?api_key=${api_key}`);
};
const getAllTVShows = (page = 1) => {
  return Axios.get(`${MovieBaseUrl}/discover/tv?api_key=${api_key}&page=${page}`);
};

const getTVGenres = () => {
  return Axios.get(`${MovieBaseUrl}/genre/tv/list?api_key=${api_key}`);
};
const getTVShowsByGenre = (genreId: number, page = 1) => {
  return Axios.get(`${MovieBaseUrl}/discover/tv?api_key=${api_key}&with_genres=${genreId}&page=${page}`
  )};
const getMoviesByGenreId = (id: number) => {
  return Axios.get(`${MovieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`);
};

const getSeriesByGenreId = (id: number) => {
  return Axios.get(`${MovieBaseUrl}/discover/tv?api_key=${api_key}&with_genres=${id}`);
};

const getTrendingByGenre = (id: number) => {
  return Axios.get(`${MovieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}&sort_by=popularity.desc`);
};

const getNewReleaseByGenre = (id: number) => {
  return Axios.get(`${MovieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}&sort_by=release_date.desc`);
};


export default {
  getAllMovies,
  getTrendingMovies,
  getMoviesByGenreId,
  getSeriesByGenreId,
  getTrendingByGenre,
  getNewReleaseByGenre,
  getNewReleaseMovies,
  getSearchMovies,
  getMovieDetails,
  getMoviesByGenre,
  getGenres,
  getTVShowsByGenre,
  getTVGenres,
  getAllTVShows
};
