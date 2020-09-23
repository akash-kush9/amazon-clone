import { Link } from "react-router-dom";
import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://1000logos.net/wp-content/uploads/2019/07/Amazon-logo-2000%E2%80%93present.jpg"
        />
      </Link>
      <div className="login__container">
        <h1> Login</h1>
        <form>
          <h5 name="email">Email :</h5>
          <input id="email" placeholder="Type your Email address" type="text" />
          <h5 name="password">Password :</h5>
          <input
            id="password"
            placeholder="Type your password"
            type="password"
          />
          <button className="login__singInButton" type="submit">
            Login
          </button>
        </form>
        <p>
          By continuing, you agree to{" "}
          <Link to="/help/customer/terms_condition">Amazon's Conditions</Link>{" "}
          of <Link to="/help/customer/user_privacy">User & Privacy</Link>{" "}
          Notice.
        </p>
        <button className="login__registerButton">
          Create your amazon account
        </button>
      </div>
    </div>
  );
};

export default Login;
