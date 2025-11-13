import { NavLink } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { ImTv } from "react-icons/im";
import { BiMoviePlay } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import "./MobileNavigation.css";

const MobileNavigation = () => {
  return (
    <nav className="mobile-nav d-lg-none">
      <ul className="mobile-nav-list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "bottom-nav-link active" : "bottom-nav-link"
            }
          >
            <MdHomeFilled size={22} />
            <span>Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "bottom-nav-link active" : "bottom-nav-link"
            }
          >
            <BiMoviePlay size={22} />
            <span>Movies</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/tvshows"
            className={({ isActive }) =>
              isActive ? "bottom-nav-link active" : "bottom-nav-link"
            }
          >
            <ImTv size={20} />
            <span>TV Shows</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "bottom-nav-link active" : "bottom-nav-link"
            }
          >
            <IoSearch size={22} />
            <span>Search</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
