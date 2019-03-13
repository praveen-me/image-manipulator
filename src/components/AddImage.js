import React, { Component } from 'react';

class AddImage extends Component {
  state = {
    err: '',
    imageURL: ''
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
          const {height, width, src} = e.target;

          if(height === 1024 && width === 1024) {
            this.setState({
              imageURL: src,
              err: ''
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
    const {err, imageURL} = this.state;
    
    return (
      <div className="form-container">
        <h3>Upload Image</h3>
        <form >
          <input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}/>
        </form>
        <div className="container">
          <div className="err">
            {
              err ? <p className="err-msg">{err}</p> : imageURL ? <img src={imageURL} alt=""/> : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default AddImage;