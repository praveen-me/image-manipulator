import { SET_IMAGE_FILE, SET_IMG_CONVERTED_URL, SUBMIT_FORM, GET_GALLERY } from "../actions/types";

const initState = {
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
  currentConvertedUrls: null,
  gallery: null,
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

    case SUBMIT_FORM: {
      return {
        ...state, 
        currentConvertedUrls : null
      }
    }

    case GET_GALLERY: {
      // console.log;
      return {
        ...state,
        gallery: action.gallery
      }
    }
    
    default: return state;
  }
}

export default rootReducer;