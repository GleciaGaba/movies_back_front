import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';

function App() {
  const [movies, setMovies] = useState([]);  // Initialise les films avec un tableau vide
  const [movie, setMovie] = useState(null);  // Initialise `movie` comme null
  const [reviews, setReviews] = useState([]);  // Initialise les reviews avec un tableau vide

  const getMovies = async () => {
    try {
      const response = await api.get('/api/v1/movies');
      setMovies(response.data);  // Mets à jour l'état des films
    } catch (error) {
      console.error(error);
    }
  };

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;

      setMovie(singleMovie); 
       
      setReviews(singleMovie.reviews || []); 
     
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();  // Récupère la liste des films à chaque chargement
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route 
            path="/Reviews/:movieId" 
            element={<Reviews 
                        getMovieData={getMovieData} 
                        movie={movie}
                        reviews={reviews}  // Passe l'état `reviews` ici
                        setReviews={setReviews}  // Passe la fonction pour mettre à jour les reviews
                      />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
