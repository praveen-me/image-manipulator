import { SET_IMAGE_FILE } from "../actions/types";

const initState = {
  image: null
}

function rootReducer (state = initState, action) {
  switch(action.type) {

    // Set Valid Image Into Reducer
    case SET_IMAGE_FILE : {
      return {
        image : action.image
      }
    }
    
    default: return state;
  }
}

export default rootReducer;