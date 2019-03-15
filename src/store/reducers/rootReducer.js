import { SET_IMG_CONVERTED_URL, SUBMIT_FORM, GET_GALLERY, CROP_IMAGE } from "../actions/types";

// setting initial state
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
      return {
        ...state,
        gallery: action.gallery
      }
    }

    case CROP_IMAGE: {
      const {newURL, id} = action.image;
      
      const allUrls = [...state.currentConvertedUrls];
      allUrls[id].url = newURL;

      return {
        ...state,
        currentConvertedUrls: allUrls
      }
      
    }
    
    default: return state;
  }
}

export default rootReducer;