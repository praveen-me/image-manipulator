import React, { Component } from 'react';

class ImageResizer extends Component {
  
  state = {
    imgURL : null
  }
  
  componentDidMount() {
    const {imgHeight, imgWidth, image} = this.props;
    this.convertImage(imgHeight, imgWidth, image);
  }

  convertImage = (customHeight, customWidth, image) => {
    // console.log(customHeight, customWidth);
    console.log(image);
      // this.setState({
      //   imgURL : e.target.src
      // });

      // const canvas = document.createElement("canvas");
      // const ctx = canvas.getContext("2d");
      
      // const canvasImage = document.createElement('canvas');
      // const citx = canvasImage.getContext('2d');
      
      // const { height, width } = image;
      
      // canvas.height = customHeight.height;
      // canvas.width = customWidth.width;
      
      // // try to make a image of that resolution
      // citx.width = image.width;
      // citx.height = image.height;
      
      // citx.drawImage(image, 0, 0, canvasImage.width, canvasImage.height);
      
      // ctx.drawImage(canvasImage, 0, 0, canvasImage.width, canvasImage.height, 0, 0, canvas.width, canvas.height);
      
      // // console.log(e.target);

      // ctx.canvas.toBlob((blob) => {
      //   console.log(blob);
      //   const newFile = new File([blob], image, {
      //     type: 'image/jpeg',
      //     lastModified: Date.now()
      //   });
      //   this.setState({
      //     imgURL : URL.createObjectURL(newFile)
      //   })
      // }, 'image/jpeg', 1)   
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // const {height, width} = newImage;

      const width = customWidth;
      const height = customHeight;
      // canvas.height = canvas.width * ( height / width );

      canvas.height = height;
      canvas.width = width;

      // try to make a image of that resolution
      const oc = document.createElement('canvas');

      oc.width = image.width;
      oc.height = image.height;

      const octx = oc.getContext('2d');

      octx.drawImage(image, 0, 0, oc.width, oc.height);

      ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height );
      
        const url = ctx.canvas.toDataURL();
        console.log(url);
        this.setState({
          imgURL : url
        })
      
  };

  render() {
    const {imgURL} = this.state;
    
    return (
      <div>
        {
          imgURL ?  
          <img src={imgURL} alt=""/> : ''
        }
      </div>
    );
  }
};

export default ImageResizer;