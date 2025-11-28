import { IoLogOutOutline, IoSearch, IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";
import "../../index.css";
import BrandLogo from "../../assets/myLogo bacgroundNone.png";
import { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link to={isAuthenticated ? "/home" : "/"} className="text-decoration-none">
          <div className="navbar-brand bg-white rounded-2 p-1 text-black d-flex align-items-center">
            <img
              src={BrandLogo}
              alt="brandlogo"
              className="img-fluid"
              style={{ width: "60px" }}
            />
            TaluxMax
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {isAuthenticated && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink to="/home" className="nav-link">Home</NavLink></li>
              <li className="nav-item"><NavLink to="/movies" className="nav-link">Movies</NavLink></li>
              <li className="nav-item"><NavLink to="/tvshows" className="nav-link">TV Shows</NavLink></li>
              <li className="nav-item"><NavLink to="/popular" className="nav-link">Popular</NavLink></li>
              <li className="nav-item"><NavLink to="/mylist" className="nav-link">My List</NavLink></li>
            </ul>

            <form className="input-group" onSubmit={handleSubmit}>
              <span className="input-group-text bg-dark">
                <IoSearch className="text-white" size={20} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search Movies..."
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
              />
            </form>

            <IoNotifications className="me-3 text-white fs-3" size={24} />

            <FaUser className="text-white" size={24} />

            <button
              className="btn btn-link text-white fs-3"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <IoLogOutOutline size={24} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
