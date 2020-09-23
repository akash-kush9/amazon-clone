import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import { auth, provider } from "./../firebase";
import { useStateValue } from "./../StateProvider/StateProvider";
import * as actionTypes from "./../StateProvider/actionTypes";

const Login = () => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signIn = (e) => {
    e.preventDefault();
    // auth.signInWithPopup()
    console.log("   ", email, "   ", password);
  };

  const registerWithEmail = (e) => {
    e.preventDefault();
    // firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authuser) => {
        // console.log(authuser);s
        console.log(authuser.user.email);
        dispatch({
          type: actionTypes.SET_USER,
          authuser: authuser,
        });
        history.push("/");
      })
      .catch((e) => {
        setError({ code: e.code.split("/")[1], message: e.message });
        console.error(e);
      });
  };
  const registerWithGoogle = (e) => {
    e.preventDefault();
    return null;
    // firebase register
    auth
      .signInWithPopup(provider)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        setError({ code: error.code.split("/")[1], message: error.message });
      });
  };

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
          <h5>Email :</h5>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setError({});
            }}
            placeholder="Type your Email"
            type="text"
            value={email}
          />
          {error?.code === "invalid-email" ? (
            <div className="login__error"> {error.message} </div>
          ) : null}
          <h5>Password :</h5>
          <input
            onChange={(e) => {
              setError({});
              setPassword(e.target.value);
            }}
            value={password}
            placeholder="Type your password"
            type="password"
          />
          {error?.code === "weak-password" ? (
            <div className="login__error"> {error.message} </div>
          ) : null}
          <button
            // disabled={error}
            className="login__singInButton"
            type="submit"
            onClick={signIn}
          >
            Login
          </button>
        </form>
        <p>
          By continuing, you agree to{" "}
          <Link to="/help/customer/terms_condition">Amazon's Conditions</Link>{" "}
          of <Link to="/help/customer/user_privacy">User & Privacy</Link>{" "}
          Notice.
        </p>
        <button onClick={registerWithEmail} className="login__registerButton">
          Create your amazon account
        </button>
        <button onClick={registerWithGoogle} className="login__registerButton">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
