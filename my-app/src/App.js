import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [directorTerm, setDirectorTerm] = useState("");
  const [genreTerm, setGenreTerm] = useState("");
  const [queryDirector, setQueryDirector] = useState("");
  const [queryGenre, setQueryGenre] = useState("");
  const [queryLanguage, setQueryLanguage] = useState("");
  const [queryYear, setQueryYear] = useState("");
  const [queryAwards, setQueryAwards] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeQuery, setActiveQuery] = useState(null);

  const handleSearch = () => {
    axios
      .post("http://localhost:3001/movies", {
        title: searchTerm,
        director: directorTerm,
        genre: genreTerm,
      })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setMovies(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuery = (query) => {
    axios
      .post("http://localhost:3001/query", {
        query: query,
        director: queryDirector,
        genre: queryGenre,
        language: queryLanguage,
        year: queryYear,
        awards: queryAwards,
      })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setMovies(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setActiveQuery(query);
  };

  const queryDescriptions = {
    1: "This query returns the highest rated movies not directed by a specific director.",
    2: "This query fetches movies of a particular genre and language, excluding those that have a director listed in the cast table.",
    3: "This query retrieves movies that have won certain awards and are in a specific language, excluding those directed by a specific director.",
    4: "This query selects movies from a specific year with their ratings and votes, excluding those where the specified director is present in the cast table.",
    5: "This query retrieves movies of a specific genre with their plot and director, excluding those with the selected language.",
  };

  return (
    <div className="App">
      <header className="App-header">
        {activeQuery && (
          <p className="query-description-active">
            {queryDescriptions[activeQuery]}
          </p>
        )}
        <div className="query-inputs">
          <input
            type="text"
            value={queryDirector}
            onChange={(e) => setQueryDirector(e.target.value)}
            placeholder="Director name..."
            className="input-large"
          />
          <input
            type="text"
            value={queryGenre}
            onChange={(e) => setQueryGenre(e.target.value)}
            placeholder="Genre..."
            className="input-large"
          />
          <input
            type="text"
            value={queryLanguage}
            onChange={(e) => setQueryLanguage(e.target.value)}
            placeholder="Language..."
            className="input-large"
          />
          <input
            type="text"
            value={queryYear}
            onChange={(e) => setQueryYear(e.target.value)}
            placeholder="Year..."
            className="input-large"
          />
          <input
            type="text"
            value={queryAwards}
            onChange={(e) => setQueryAwards(e.target.value)}
            placeholder="Awards..."
            className="input-large"
          />
        </div>
        <div className="query-buttons">
          <button
            className="query-button"
            onClick={() => handleQuery(1)}
            onMouseEnter={() => setActiveQuery(1)}
          >
            Query 1
          </button>
          <button
            className="query-button"
            onClick={() => handleQuery(2)}
            onMouseEnter={() => setActiveQuery(2)}
          >
            Query 2
          </button>
          <button
            className="query-button"
            onClick={() => handleQuery(3)}
            onMouseEnter={() => setActiveQuery(3)}
          >
            Query 3
          </button>
          <button
            className="query-button"
            onClick={() => handleQuery(4)}
            onMouseEnter={() => setActiveQuery(4)}
          >
            Query 4
          </button>
          <button
            className="query-button"
            onClick={() => handleQuery(5)}
            onMouseEnter={() => setActiveQuery(5)}
          >
            Query 5
          </button>
        </div>
        <hr />
        <div className="search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie..."
            className="input-large"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <hr />
        <div className="results">
          {movies.map((movie) => (
            <div className="movie" key={movie.imdb_id}>
              <h2>{movie.title}</h2>
              <p>{movie.plot}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
