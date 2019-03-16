// converts image into specific size
const cropImage = (xStart = 0, yStart = 0, xEnd = 0, yEnd = 0, image) => {
  // let newSrc = '';
  const newImage = new Image();
  newImage.src = image;
  
  const {height, width} = newImage;
  
  const canvasImage = document.createElement('canvas');
  const imageCtx = canvasImage.getContext('2d');

  // try to make a image of particular resolution  

  canvasImage.width = width;
  canvasImage.height = height;

  // crop Image according to new values
  imageCtx.drawImage(newImage, xStart, yStart, canvasImage.width - xEnd, canvasImage.height - yEnd, 0, 0, width, height);

  return imageCtx.canvas.toDataURL();
};

export default cropImage;