import * as actionTypes from "./../actionTypes";

export const initialState = {
  basket: [
    {
      id: "23445930",
      title:
        "Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric",
      price: 98.99,
      image:
        "https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$",
      rating: 5,
    },
    {
      id: "49538094",
      title:
        "Kenwood kMix Stand Mixer for Baking, Stylish Kitch…-beater, Dough Hook and Whisk, 5 Litre Glass Bowl",
      price: 239,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
      rating: 4,
    },
    {
      id: "12321341",
      title:
        "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
      price: 11.96,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
      rating: 5,
    },
  ],
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
