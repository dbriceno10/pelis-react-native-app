import { Movie } from "../../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMovie = async (movie: Movie) => {
  let storage = await AsyncStorage.getItem("movies");
  let movies: Movie[] = [];
  if (storage) {
    movies = [...JSON.parse(storage)];
    const searchMovie = movies.find((e) => e.imdbID === movie.imdbID);
    if (!searchMovie) {
      movies.push(movie);
      await AsyncStorage.setItem("movies", JSON.stringify(movies));
      alert("La pelicula se ha guardado en favoritos");
    } else {
      alert("La pelicula seleccionada ya se ha guardado en favoritos");
    }
  } else {
    movies.push(movie);
    await AsyncStorage.setItem("movies", JSON.stringify(movies));
    alert("La pelicula se ha guardado en favoritos");
  }
};

export const getMovies = async () => {
  let storage = await AsyncStorage.getItem("movies");
  let movies: Movie[] = [];
  if (storage) {
    movies = [...JSON.parse(storage)];
  }
  return movies;
};

export const searchMovieBool = async (movie: Movie) => {
  let storage = await AsyncStorage.getItem("movies");
  let movies: Movie[] = [];
  let search = false;
  if (storage) {
    movies = [...JSON.parse(storage)];
    const searchMovie = movies.find((e) => e.imdbID === movie.imdbID);
    searchMovie ? (search = true) : (search = false);
  }
  return search;
};

export const searchMovie = async (movie: Movie) => {
  let storage = await AsyncStorage.getItem("movies");
  let movies: Movie[] = [];
  if (storage) {
    movies = [...JSON.parse(storage)];
    const searchMovie = movies.find((e) => e.imdbID === movie.imdbID);
    if (searchMovie) movies.push(searchMovie);
  }
  return movies;
};

export const deleteMovie = async (
  movie: Movie,
  setMovies?: React.Dispatch<React.SetStateAction<Movie[]>>
) => {
  const searchedMovie = await searchMovie(movie);
  if (searchMovie.length > 0) {
    const filteredMovies = searchedMovie.filter(
      (e) => e.imdbID !== movie.imdbID
    );
    await AsyncStorage.setItem("movies", JSON.stringify(filteredMovies));
    setMovies && setMovies(filteredMovies);
    alert("La pelicula se ha eliminado de favoritos");
  } else {
    alert("No se encontro la pelicula");
  }
};
