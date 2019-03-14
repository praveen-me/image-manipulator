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
      const fileName = e.target.value;

      // Creating a new File reader
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const newImage  = new Image();
        newImage.src = e.target.result;

        newImage.onload = (e) => {       
          const { height, width} = e.target;

          if(height === 1024 && height === 1024) {
          
            this.props.dispatch(imageActions.setImgConvertedUrls(newImage, fileName))
    
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
    const { err } = this.state;
    
    return (
      <div className="form-container">
        <h3>Upload Image</h3>
        <form >
          <input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}/>
        </form>
        {
          err ? <p>{err}</p> : ''
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { imgResolutions } = state;
  return {
    imgResolutions
  }
}

export default connect(mapStateToProps)(AddImage);