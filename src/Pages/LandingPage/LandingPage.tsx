import React, { useEffect, useState } from "react";
import GlobalAPI from "../../services/GlobalAPI";
import './LandingPage.css'
import NewReleaseMovieList from "../../components/NewReleaseMovieList/NewReleaseMovieList";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const LandingPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const newReleases = await GlobalAPI.getNewReleaseMovies();
        setMovies(newReleases.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {/* <LandingPageNavBar/> */}
      <div className="landing-page">
        {/* Hero Section - Enhanced Carousel */}
        <section className="hero">
          <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
            {/* Indicators */}
            <div className="carousel-indicators">
              {movies.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#movieCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              {movies.map((movie, index) => (
                <div
                  key={movie.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="4000"
                >
                  <div className="carousel-image-container">
                    <img
                      src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
                      className="carousel-image"
                      alt={movie.title}
                    />
                  </div>
                
                </div>
              ))}
            </div>

           
          </div>
        </section>

       {/* Hero content positioned as overlay */}
          <div className="hero-content-overlay position-absolute top-25 text-center">
            <h1 className="hero-title">Unlimited Movies, TV Shows, and More.</h1>
            <p className="hero-subtitle">
              Watch anywhere. Cancel anytime.
            </p>
            <form className="hero-form d-flex justify-content-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control email-input"
                required
              />
              <button type="submit" className="get-started-btn rounded-2 p-3 ">
                Get Started
              </button>
            </form>
            <div className="auth-links mt-3">
              <Link to={'/login'} className="signin-btn  text-decoration-none rounded-2 p-2 me-2">Sign In</Link>
               <Link to={'/register'} className="reg-btn text-decoration-none rounded-2 p-2">Register</Link>
            </div>
          </div>



        {/* Featured Movies Section */}
        <section className="featured-movies pt-5">
          <div className="container">
            <div className="section-header text-center mb-5">
              <h2 className="section-title">Now Playing</h2>
              <p className="section-subtitle">Discover the latest blockbuster movies</p>
            </div>
            <div className="row g-4">
              <NewReleaseMovieList />
            </div>
          </div>
        </section>


      </div>
      <Footer />
    </>

  );
};

export default LandingPage;