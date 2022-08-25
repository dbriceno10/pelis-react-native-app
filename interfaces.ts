export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface ResponseMovies {
  Search: Array<Movie>;
  TotalResults: string;
  Response: string;
}
