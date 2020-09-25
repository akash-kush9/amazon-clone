import * as actionTypes from "./../actionTypes";

export const initialState = {
  basket: [],
  authuser: null,
};

//Selectors
export const getBasketTotal = (basket) =>
  basket?.reduce((total, item) => total + item.price, 0);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        authuser: action.authuser,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        authuser: null,
      };
    case actionTypes.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };
    case actionTypes.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id:${action.id}) as it's not in basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
