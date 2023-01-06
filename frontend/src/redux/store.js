import { createStore, combineReducers,applyMiddleware } from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"

import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";


const reducer = combineReducers({
    cart: cartReducer,
    userRegisterLogin: userRegisterLoginReducer
})

// this for setting initial state - get user data from local storage or session storage if there 
// only for conditional header link rendering - Use JSON web token for protected routes
const userInfoInLocalStorage = () =>{
    if(localStorage.getItem('userInfo')){
        return JSON.parse(localStorage.getItem('userInfo')) 
    }
    else if(sessionStorage.getItem('userInfo')) {
        return JSON.parse(sessionStorage.getItem('userInfo')) 
    }
    else return {}
} 

const cartItemsInLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];



// set initial state values for redux
const INITIAL_STATE = {
    cart: {
        cartItems: cartItemsInLocalStorage,
        itemsCount: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((quantity, item) => Number(item.quantity) + quantity, 0) : 0,
        cartSubtotal: cartItemsInLocalStorage ? cartItemsInLocalStorage.reduce((price, item) => price + item.price * item.quantity, 0) : 0
    },
    userRegisterLogin: {userInfo: userInfoInLocalStorage()}
}


const middleware = [thunk]
const store = createStore(reducer, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

