import { SET_IMAGE_FILE } from './types.js'

const imageActions = {
  setImageFile: (image) => {
    return {
      type: SET_IMAGE_FILE,
      image
    }
  }
}

export default imageActions;