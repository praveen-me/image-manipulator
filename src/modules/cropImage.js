// converts image into specific size and returns that image url
const cropImage = (xStart, yStart, xEnd, yEnd, image) => {
  // TODO: Crop Image
  // 1 - Take Start X 
  // 2 - Take Start Y
  // 3 - Height - (height - Start Y)
  // 4 - Width - (width - Start X)
  
  // let newSrc = '';
  const newImage = new Image();
  newImage.src = image;
  
  const {height, width} = newImage;
  
  const canvasImage = document.createElement('canvas');
  const imageCtx = canvasImage.getContext('2d');

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // try to make a image of particular resolution
  canvasImage.width = width - xStart;
  canvasImage.height = height -yStart;

  // ctx height and width
  canvas.width = canvasImage.width - xEnd; 
  canvas.height = canvasImage.height - yEnd; 

  // for image ( 755 X 450 )
  // xStart & yStart = 50.
  // width / height - 705, 400 (Done First Part)

  // in second canvas
  // xEnd & yEnd = 50
  // width / height = 655, 350 (Done in Second Canvas Part)


  imageCtx.drawImage(newImage, xStart, yStart, canvasImage.width - xStart, canvasImage.height - yStart, 0, 0, canvasImage.width, canvasImage.height)

  ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height,)

  return ctx.canvas.toDataURL();
};

export default cropImage;