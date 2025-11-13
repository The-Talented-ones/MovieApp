import { IoLogOutOutline, IoSearch } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";
import "../../index.css";
import BrandLogo from "../../assets/myLogo bacgroundNone.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to={isAuthenticated ? "/home" : "/"} className="text-decoration-none">
          <a
            className="navbar-brand bg-white rounded-2 p-1 text-decoration-none text-black d-flex align-items-center"
            href="#"
          >
            <img
              src={BrandLogo}
              alt="brandlogo"
              className="img-fluid"
              style={{ width: "60px" }}
            />
            TaluxMax
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuthenticated && ( 
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/home" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/movies" className="nav-link">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/tvshows" className="nav-link">
                  TV Shows
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/popular" className="nav-link">
                  Popular
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/mylist" className="nav-link">
                  My List
                </NavLink>
              </li>
            </ul>

            <form className="input-group" onSubmit={handleSubmit}>
              <span className="input-group-text bg-dark">
                <IoSearch className="text-white" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search Movies..."
                aria-label="Search"
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </form>

            <IoNotifications className="me-3 text-white fs-3" />
            <div className="user">
              <FaUser className="text-white" />
            </div>
            <button
              className="btn btn-link text-white fs-3"
              onClick={() => {
                logout();
                navigate("/login"); // redirect to login after logout
              }}
              style={{ textDecoration: "none" }}
            >
              <IoLogOutOutline />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
