import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";
import ExplorePage from "./Pages/ExplorePage";
import MoviesPage from "./components/MoviesPage";
import TVShowsPage from "./Pages/TVShowsPage";
import './App.css';
import Movies from "./Pages/Movies";
// import ActionMovies from "./Pages/Genres/ActionMovies";
// import AdventureMovies from "./Pages/Genres/AdventureMovies";
// import ComedyMovies from "./Pages/Genres/ComedyMovies";
// import CrimeMovies from "./Pages/Genres/CrimeMovies";
// import AnimationMovies from "./Pages/Genres/AnimationMovies";
import GenrePage from "./Pages/GenrePage";
import PopularPage from "./Pages/PopularPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ProtectedRoute from './components/protectedRoute';
import MobileNavigation from "./components/MobileNavigation/MobileNavigation";

const App = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <PopularPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tvshows"
          element={
            <ProtectedRoute>
              <TVShowsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/genre/:id"
          element={
            <ProtectedRoute>
              <GenrePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <ProtectedRoute>
              <DetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <section className="d-block d-lg-none">
        <MobileNavigation />
      </section>

    </div>
  );
};

export default App;
