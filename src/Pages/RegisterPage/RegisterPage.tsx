import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

  
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    navigate("/login");

  };

  return (
    <div className="container d-flex flex-column align-items-center text-light">
      <div className="reg-con d-flex flex-column align-items-center text-light mt-5 rounded-3">
        <h2 className="text-white mt-3">Register</h2>

        <form onSubmit={handleRegister} className="w-75">
          <div className="form-floating my-5">
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter a valid Email"
              required
            />
            <label htmlFor="email" className="text-white">
              Enter a valid Email
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

          <div className="form-floating my-5">
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <label htmlFor="confirmPassword" className="text-white">
              Confirm your Password
            </label>
          </div>

          <div className="text-center">
            <button type="submit" className="reg-btn rounded-2 fw-bold p-2">
              Register
            </button>
          </div>
        </form>

        <p className="text-white mt-3">
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
