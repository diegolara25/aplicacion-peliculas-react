import { useState } from "react";

export const BuscadorPeliculas = () => {
  // const urlApi = 'https://api.themoviedb.org/3/movie/11?api_key'
  const API_KEY = "55f12ab48e45425a0acdd18f91d4ee29";

  const [pelicula, setPelicula] = useState("");

  const [dataApi, setDataApi] = useState([]);
  console.log('dataApi:',dataApi)

  const handlePeliculas = (e) => {
    // const nombrePelicula = e.target.value;
    // const concatenarNombrePelicula = nombrePelicula.replace(/\s/g, "+");
    setPelicula(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pelicula.length > 0) 
    ApiPeliculas();
  };

  const ApiPeliculas = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${pelicula}&api_key=${API_KEY}`
      );
      const data = await response.json();
      console.log('data: ',data)
      setDataApi(data.results || []);
    } catch (error) {
      console.error("se encontro el sigueinte error: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="peliculas"
          value={pelicula}
          onChange={handlePeliculas}
        />
        <button type="submit" className="search-button">
          Buscar Pelicula
        </button>
      </form>

      <div className="movie-list">
        {dataApi.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
