import React, { Component } from 'react';
import {  connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';
import { withRouter } from 'react-router-dom';


class AddImage extends Component {
  state = {
    err: '',
  }

  handleChange = e => {
    const {value, files} = e.target;

    // Checking for the file extension
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
          // Checking File Size
          if(height === 1024 && height === 1024) {
          
            // Dispatch action for creating converted urls
            this.setState({
              err: ''
            }, () => {
              this.props.dispatch(imageActions.setImgConvertedUrls(newImage, fileName))
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

  // Submitting the form for final view
  render() {
    const { err } = this.state;
    const { atSubmit } = this.props;
    
    return (
      <div className="form-container center wrapper">
        <h3 className="form-head">Upload Image (Image Resolution should be 1024 X 1024)</h3>
        <form onSubmit={(e) => atSubmit(e)}>
          <input type="file" accept="image/png, image/jpeg" onChange={this.handleChange}/>
          <button onClick={(e) => atSubmit(e)}>Submit</button>
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