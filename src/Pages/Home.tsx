
import Footer from '../components/Footer/Footer'
import MobileNavigation from '../components/MobileNavigation/MobileNavigation'
import Slider from '../components/Slider/Slider'
import GenreMovieList from '../components/GenreMovieList/GenreMovieList'
import NewReleaseMovieList from '../components/NewReleaseMovieList/NewReleaseMovieList'
import TrendingMovieList from '../components/Trending/Trending'
import MoviesPage from '../components/MoviesPage'



const Home = () => {
  
  return (
    <div>
      <Slider/>
      <GenreMovieList/>
      <TrendingMovieList />
      <NewReleaseMovieList />
      <Footer/>
      <MobileNavigation  />
    </div>
  )
}

export default Home
