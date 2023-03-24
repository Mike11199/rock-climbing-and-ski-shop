import { SET_DARK_MODE, SET_LIGHT_MODE } from "../constants/darkModeConstants";

const MODE_INITIAL_STATE = {
    mode: "light",
}


export const setDarkModeReducer = (state = MODE_INITIAL_STATE, action) => {
   
    switch (action.type) {
      
      
        case SET_DARK_MODE:
            return { 
                ...state,
                mode: action.payload
            }

        case SET_LIGHT_MODE:
            return { 
                ...state,
                mode: action.payload
            }
                
      
        default:
            return state;
    }
  };