import { SET_IMAGE_FILE, SET_IMG_CONVERTED_URL, SUBMIT_FORM, GET_GALLERY } from './types.js'
import imgConverter from '../../modules/imgConverter.js';

const imageActions = {
  setImageFile: (image) => {
    return {
      type: SET_IMAGE_FILE,
      image
    }
  },

  setImgConvertedUrls : (image, name) => (dispatch, getState) => {
    const { imgResolutions } = getState(); 

    // Creating new Array with all the converted URLS
    const convertedUrls = imgResolutions.map(({ height, width , type}) => ({
      url : imgConverter(height, width, image),
      name : `${name}-${type}`,
      type
    }));

    return dispatch({
      type : SET_IMG_CONVERTED_URL,
      urls: convertedUrls
    })    
  },

  submitForm : (cb) => (dispatch, getState) => {
    const { currentConvertedUrls } = getState();

    fetch(`http://localhost:3001/gallery`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({
        urls: currentConvertedUrls,
        createdAt: new Date(),
      })
    })
      .then(res => {
        if(res.status === 201) {
          dispatch({
            type: SUBMIT_FORM
          })      
          cb(true)
        }
      })
  },

  getGallery: (cb) => (dispatch) => {
    fetch(`http://localhost:3001/gallery`)
      .then(res => res.json())
      .then(gallery => {
        dispatch({
          type: GET_GALLERY,
          gallery,
        })
        cb(true)
      })
  }
}

export default imageActions;