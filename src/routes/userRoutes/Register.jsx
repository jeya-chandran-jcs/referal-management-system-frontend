import React, { useState } from "react";
import axios from "axios";
import {  Link,useNavigate } from "react-router-dom";
import { API } from "../../global";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    console.log(name,email,password)
    e.preventDefault();
    try {
        const response = await axios.post(`${API}user/register`, {
            name,
            email,
            password,
      });
      console.log(response.data);
      navigate("/user/login")
    } catch (err) {
      console.error(err, "registration error");
    }
  };

  return (
    <div
      className="container vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#f8f9fa" }} 
    >
      <div className="card shadow-lg p-4" style={{ minWidth: "400px", maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Sign Up</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name:
              </label>
              <input
                className="form-control"
                value={name}
                id="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                className="form-control"
                value={email}
                id="email"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                className="form-control"
                value={password}
                id="password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary w-100">Register</button>
            </div>
          </form>
          <div className="mt-3 text-start">
            <Link to="/user/login" className="text-center d-block">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
