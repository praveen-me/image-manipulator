// converts image into specific size
const imgConverter = (customHeight, customWidth, image) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const canvasImage = document.createElement('canvas');
  const imageCtx = canvasImage.getContext('2d');

  // try to make a image of particular resolution
  canvas.height = customHeight;
  canvas.width = customWidth;

  canvasImage.width = image.width;
  canvasImage.height = image.height;

  imageCtx.drawImage(image, 0, 0, canvasImage.width, canvasImage.height);

  // drawing image of particular height and width
  ctx.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height, 0, 0, canvas.width, canvas.height );
  
  // return url of the converted image
  return ctx.canvas.toDataURL();
};

export default imgConverter;
