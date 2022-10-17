import { Movie } from "../../interfaces";

export const saveMovie = (movie: Movie) => {
  let storage = localStorage.getItem("movies");
  let movies: Movie[] = [];
  if (storage) {
    movies = [...JSON.parse(storage)];
    const searchMovie = movies.find((e) => e.imdbID === movie.imdbID);
    if (!searchMovie) {
      movies.push(movie);
      localStorage.setItem("movies", JSON.stringify(movies));
    } else {
      alert("La pelicula seleccionada ya se ha guardado");
    }
  } else {
    movies.push(movie);
    localStorage.setItem("movies", JSON.stringify(movies));
  }
};

export const searchMovieBool = (movie: Movie) => {
  let storage = localStorage.getItem("movies");
  let movies: Movie[] = [];
  let search = false;
  if (storage) {
    movies = [...JSON.parse(storage)];
    const searchMovie = movies.find((e) => e.imdbID === movie.imdbID);
    searchMovie ? (search = true) : (search = false);
  }
  return search;
};

export const searchMovie = (movie: Movie) => {
  let storage = localStorage.getItem("movies");
  let movies: Movie[] = [];
  if (storage) {
    movies = [...JSON.parse(storage)];
    const searchMovie = movies.find((e) => e.imdbID === movie.imdbID);
    if (searchMovie) movies.push(searchMovie);
  }
  return movies;
};

export const deleteMovie = (movie: Movie) => {
  const searchedMovie = searchMovie(movie);
  if (searchMovie.length > 0) {
    const filteredMovies = searchedMovie.filter((e) => e.imdbID !== movie.imdbID);
    localStorage.setItem('movies', JSON.stringify(filteredMovies))
  } else {
    alert('No se encontro la pelicula')
  }
};
