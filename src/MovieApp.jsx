import { useState } from "react";
import styles from "./MovieApp.module.css";
const MovieApp = () => {
  const API_KEY = "25c6af24f962ffe93427031cb614e446";
  const URL = `https://api.themoviedb.org/3/search/movie`;

  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const handleInputChange = ({ target }) => {
    setSearch(target.value);
    console.log(search);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchmovies();
  };

  const fetchmovies = async () => {
    try {
      const response = await fetch(
        `${URL}?query=${search}&api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      setMovieList(data.results);
    } catch (error) {
      console.error(`Ha ocurrido el siguiente error : ${error}`);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribi una pelicula"
          value={search}
          onChange={handleInputChange}
        />
        <button> Buscar</button>
      </form>
      {movieList && (
        <div className={styles.movieList}>
          {movieList.map((movie) => {
            return (
              <div key={movie.id} className={styles.movieCard}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h2> {movie.title} </h2>
                <p> {movie.overview} </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MovieApp;
