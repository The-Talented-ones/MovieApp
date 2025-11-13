import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; 
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); 
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(email, password);
    if (success) {
      navigate("/home"); 
    } else {
      alert("Invalid credentials or user not found! Please register first.");
      navigate("/register");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center text-light">
      <div className="login-con d-flex flex-column align-items-center text-light mt-5 rounded-3">
        <h2 className="text-white mt-3">Login</h2>

        <form onSubmit={handleLogin} className="w-75">
          <div className="form-floating mt-5">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Valid Email Address"
              required
            />
            <label htmlFor="email" className="text-white">
              Enter your Valid Email Address
            </label>
          </div>

          <div className="form-floating my-5">
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a Password"
              required
            />
            <label htmlFor="password" className="text-white">
              Enter a Password
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="login-btn rounded-2 fw-bold p-2"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="text-white mt-3">
          Don't have an account? <Link to={"/register"}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
