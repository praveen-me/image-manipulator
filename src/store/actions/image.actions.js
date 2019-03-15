import { SET_IMAGE_FILE, SET_IMG_CONVERTED_URL, SUBMIT_FORM, GET_GALLERY } from './types.js'
import imgConverter from '../../modules/imgConverter.js';

const cloudinary = require('cloudinary/lib/cloudinary')

cloudinary.config({
  cloud_name : 'praveen-me',
  api_key: '422843915597153',
  api_secret: 'DsyQthxdGR3vVb1O-E3LNmD5j-k' 
});

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

    let count = 0;

    currentConvertedUrls.forEach((url, i) => {
      cloudinary.v2.uploader.upload(url.url, {
        use_filename: true,
        resource_type : "image"
      }, (err, url) => {        
        currentConvertedUrls[i].url = url.secure_url;
        count++;

        if (count === 4) {
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
        }
      })
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