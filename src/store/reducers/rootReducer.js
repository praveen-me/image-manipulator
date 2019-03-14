import { SET_IMAGE_FILE, SET_IMG_CONVERTED_URL } from "../actions/types";

const initState = {
  image: null, 
  imgResolutions : [
    {
      height : 450,
      width: 755,
      type: 'Horizontal'
    },
    {
      height : 450,
      width: 365,
      type: 'Vertical'
    },
    {
      height : 212,
      width: 365,
      type: 'Horizontal Small'
    },
    {
      height : 380,
      width: 380,
      type: 'Gallery'
    }
  ],
  currentConvertedUrls: []
}

function rootReducer (state = initState, action) {
  switch(action.type) {

    // Set Valid Image Into Reducer
    case SET_IMAGE_FILE : {
      return {
        ...state,
        image : action.image
      }
    }

    case SET_IMG_CONVERTED_URL : {
      return {
        ...state,
        currentConvertedUrls: action.urls
      }
    }
    
    default: return state;
  }
}

export default rootReducer;