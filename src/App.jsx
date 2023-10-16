import { useEffect, useState } from "react";
import './App.css'

// -----------Movie()------------

function Movie({ movieData }) {
  return (
    <>
      <h2>{movieData.Title}</h2>
      <img src={movieData.Poster} />
      <p></p>
      <p><strong>Plot:</strong> {movieData.Plot}</p>
      <p><strong>Year:</strong> {movieData.Year}</p>
      <p><strong>Rating:</strong></p>
      {movieData.Ratings.map((rating, index) => {
        return (
          <p key={index}>{rating.Source} - {rating.Value}</p>
        )
      })}
    </>
  )
}

// ------async fetchMovieData()-------

async function fetchMovieData(movieId) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieId)}&apikey=3cc31f0f`)
  const data = await response.json()
  return data
}

// --------------App()---------------

export default function App() {
  const [movieId, setMovieId] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  const option = [
    '2 Fast 2 Furious',
    'The Amazing Spider-Man',
    'Toy Story',
    'Jumanji: Welcome to the Jungle',
  ]

  const onOptionChangeHandler = (e) => {
    setMovieId(e.target.value);
  }

  useEffect(() => {
    if (movieId) {
      setLoading(true);
      fetchMovieData(movieId)
        .then((data) => setMovieData(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [movieId])

  return (
    <>
      <h1>Movie App</h1>

      <select onChange={onOptionChangeHandler}>
        <option>Select a movie</option>
        {option.map((option, index) => {
          return (<option key={index}>{option}</option>)
        })}
      </select>

      {loading && <p>loading...</p>}

      {movieData && (
        <>
          <Movie movieData={movieData} />
        </>
      )}
    </>
  )
}