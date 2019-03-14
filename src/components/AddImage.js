import React, { Component } from 'react';
import {  connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';

class AddImage extends Component {
  state = {
    err: '',
  }

  handleChange = e => {
    // Checking for the file extension
    if(/.(jpeg|jpg|png)$/.test(e.target.value)) {
      const file = e.target.files[0];

      // Creating a new File reader
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const newImage  = new Image();
        newImage.src = e.target.result;

        newImage.onload = (e) => {       
          const { height, width} = e.target;

          if(height === 1024 && height === 1024) {

            this.props.dispatch(imageActions.setImageFile(newImage));

            this.setState({
              err: ''
            })

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // const {height, width} = newImage;

            const width = 365;
            const height = 450;
            // canvas.height = canvas.width * ( height / width );

            canvas.height = height;
            canvas.width = width;

            // try to make a image of that resolution
            const oc = document.createElement('canvas');

            oc.width = newImage.width;
            oc.height = newImage.height;

            const octx = oc.getContext('2d');

            octx.drawImage(newImage, 0, 0, oc.width, oc.height);

            ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvas.width, canvas.height );
            
             const url = ctx.canvas.toDataURL();
             this.setState({
               image : url
             })
          }else {
            this.setState({
              err : `Please upload image of size 1024 X 1024. But your image size is ${height} X ${width}.`
            })
          }
        }
      }
    } else {
      this.setState({
        err: 'Please upload and image file.'
      })
    }
  }
  
  render() {
    const { err, image } = this.state;
    
    return (
      <div className="form-container">
        <h3>Upload Image</h3>
        <form >
          <input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}/>
        </form>
        {
          err ? <p>{err}</p> : ''
        }
        {
          image ? <img src={image} alt=""/> : ''
        }
      </div>
    );
  }
}

export default connect()(AddImage);