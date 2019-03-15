import { SET_IMG_CONVERTED_URL, SUBMIT_FORM, GET_GALLERY, CROP_IMAGE } from './types.js'
import imgConverter from '../../modules/imgConverter.js';
import cropImage from '../../modules/cropImage.js';

const URI = 'http://localhost:3001'

// cloudinary configuration
const cloudinary = require('cloudinary/lib/cloudinary')

cloudinary.config({
  cloud_name : 'praveen-me',
  api_key: '422843915597153',
  api_secret: 'DsyQthxdGR3vVb1O-E3LNmD5j-k' 
});

const imageActions = {
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

    // entering every image to cloudinary
    currentConvertedUrls.forEach((url, i) => {
      cloudinary.v2.uploader.upload(url.url, {
        use_filename: true,
        resource_type : "image"
      }, (err, url) => {        

        // changing url with the cloud url
        currentConvertedUrls[i].url = url.secure_url;
        count++;

        if (count === 4) {
          // sending data into DB if every image uploaded
          fetch(`${URI}/gallery`, {
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
    fetch(`${URI}/gallery`)
      .then(res => res.json())
      .then(gallery => {
        dispatch({
          type: GET_GALLERY,
          gallery,
        })
        cb(true)
      })
  },

  // crop Image
  cropImage: (imageURL, imageDetails, cb) => (dispatch) => {
    const {xStart, yStart, xEnd, yEnd, id} = imageDetails;
    const newURL = cropImage(xStart, yStart, xEnd, yEnd, imageURL);
    
    dispatch({
      type: CROP_IMAGE,
      image: {
        newURL, 
        id 
      }  
    })

    cb(true)
  }
}

export default imageActions;