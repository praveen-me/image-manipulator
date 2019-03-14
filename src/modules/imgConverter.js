const imgConverter = (customHeight, customWidth, image) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const canvasImage = document.createElement('canvas');
  const imageCtx = canvasImage.getContext('2d');

  canvas.height = customHeight;
  canvas.width = customWidth;

  // try to make a image of that resolution
  canvasImage.width = image.width;
  canvasImage.height = image.height;

  imageCtx.drawImage(image, 0, 0, canvasImage.width, canvasImage.height);

  ctx.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height, 0, 0, canvas.width, canvas.height );
  
  return ctx.canvas.toDataURL();
};


export default imgConverter
