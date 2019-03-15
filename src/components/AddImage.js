import React, { Component } from 'react';
import {  connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';
import { withRouter } from 'react-router-dom';


class AddImage extends Component {
  state = {
    err: '',
  }

  handleChange = e => {
    // Checking for the file extension
    const {value, files} = e.target;

    if(/.(jpeg|jpg|png)$/.test(value)) {
      const file = files[0];
      const fileName = value.slice(12, -4);
      
      // Creating a new File reader
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        // Creating a new Image constructor
        const newImage  = new Image();
        newImage.src = e.target.result;

        newImage.onload = (e) => {       
          const { height, width} = e.target;

          if(height === 1024 && height === 1024) {
          
            // Dispatch action for creating converted urls
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

  // Submitting the form for final view
  handleSubmit = e => {
    e.preventDefault();
    
    this.props.dispatch(imageActions.submitForm((dataStatus) => {
      if(dataStatus) {
        this.props.history.push('/gallery')
      }
    }))
  }
  

  render() {
    const { err } = this.state;
    
    return (
      <div className="form-container center wrapper">
        <h3 className="form-head">Upload Image (Image Resolution should be 1024 X 1024)</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {
          err ? <p className="err">{err}</p> : ''
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

export default connect(mapStateToProps)(withRouter(AddImage));