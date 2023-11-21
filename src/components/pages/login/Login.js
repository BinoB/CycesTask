import React, { useState } from "react";
import { login, setAuthToken } from "../listPage/AuthService";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("karn.yong@melivecode.com");
  const [password, setPassword] = useState("melivecode");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      setAuthToken(token);

      navigate.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="login">
      <form action="">
        <div className="form">
          <h1>CRUD OPERATIONS</h1>
          <h3>SIGN IN</h3>
          <p>Enter your credentials to access your account</p>
          <div className="input-box">
            <label htmlFor="userEmail">Email </label>
            <br />
            <input
              className="input"
              type="text"
              value="karn.yong@melivecode.com"
              name="userEmail"
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password </label>
            <br />
            <input
              className="input"
              type="password"
              value="melivecode"
              name="password"
              required
            />
          </div>
          <div>
            <button className="button" type="button" onClick={handleLogin}>
              <Link className="buttonlink" to="/dashboard">
                SIGN IN
              </Link>
            </button>
          </div>
          <div>
            <p className="reset">
              Forgot your password? <a href="#">Reset Password</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
