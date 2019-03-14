import { SET_IMAGE_FILE, SET_IMG_CONVERTED_URL } from './types.js'
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
     const convertedUrls = imgResolutions.map(({ height, width , type}) => ({
       url : imgConverter(height, width, image),
       name : `${name}-${type}`,
       type
     }));

      return dispatch({
        type : SET_IMG_CONVERTED_URL,
        urls: convertedUrls
      })    
  }
}

export default imageActions;