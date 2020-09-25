import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";
import * as actionTypes from "./../StateProvider/actionTypes";
import { auth } from "./../firebase";
const Header = () => {
  const [{ basket, authuser }, dispatch] = useStateValue();
  const history = useHistory();
  // const signOut = (e) => {
  //   e.preventDefault();
  //   dispatch({
  //     type: actionTypes.REMOVE_USER,
  //   });
  // };

  const handleAuthentication = () => {
    if (authuser) auth.signOut();
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://bloximages.chicago2.vip.townnews.com/kenoshanews.com/content/tncms/assets/v3/editorial/0/56/05663cea-77e2-5e21-8a79-53e9a96e9acc/5f1f3d4695a1a.image.jpg"
        />
      </Link>
      <div className="header__search">
        <input
          className="header__searchInput"
          placeholder="Search for our latest collection here.."
          type="text"
        />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link className="nav__link" to={!authuser && `/login`}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              {authuser
                ? `Hello ${authuser?.email.split("@")[0]}`
                : "Hello Guest"}
            </span>
            <span className="header__optionLineTwo">
              {authuser ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className="header__option" onClick={() => history.push("/orders")}>
          <span className="header__optionLineOne">Returns </span>
          <span className="header__optionLineTwo">Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <div
          className="header__optionBasket"
          onClick={() => history.push("/checkout")}
        >
          <ShoppingBasketIcon />
          <span className="header__optionLineTwo header__basketCount">
            <sup>{basket?.length}</sup>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
