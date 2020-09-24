import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Home from "./Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout/Checkout";
import Payment from "./Payment/Payment";
import Login from "./Login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider/StateProvider";
import * as actionTypes from "./StateProvider/actionTypes";
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      console.log("authuser", authuser);
      if (authuser) {
        // If user was or is logged in
        dispatch({
          type: actionTypes.SET_USER,
          authuser: authuser,
        });
      } else {
        //the user is loggout
        dispatch({
          type: actionTypes.SET_USER,
          authuser: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route
            path="/checkout"
            render={(props) => (
              <>
                <Header {...props} /> <Checkout {...props} />
              </>
            )}
          />
          <Route
            path="/payment"
            render={(props) => (
              <>
                <Header {...props} /> <Payment {...props} />
              </>
            )}
          />
          <Route
            path="/help/customer/terms_condition"
            render={(props) => (
              <>
                <Header {...props} /> <h1>Terms Condition</h1>
                {/* <TermsCondition /> */}
              </>
            )}
          />

          <Route path="/help/customer/user_privacy">
            <Header />
            <h1>User Privacy</h1>
            {/* <UserPrivacy /> */}
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
