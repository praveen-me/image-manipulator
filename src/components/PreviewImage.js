import React, { Component } from 'react';
import { connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';

class PreviewImage extends Component {
  state = {
    id: this.props.index,
    xStart : 0,
    xEnd : 0,
    yStart : 0,
    yEnd : 0,
  }
 
  handleChange = e => {
    const {name, value} = e.target;
    
    this.setState({
      [name] : value
    })
  }

  // submitting crop
  handleSubmit = e => {
    e.preventDefault();
    const { url } = this.props;

    this.props.dispatch(imageActions.cropImage(url, this.state, (cropStatus) => {
      if (cropStatus) {
        this.setState({
          xStart : 0,
          xEnd : 0,
          yStart : 0,
          yEnd : 0,
        })
      }
    }))
  }

  render() {
    const { url, type, name } = this.props;

    return (
      <div className="center preview-block">
        <h3 className="preview-head">{type}</h3>
        <img src={url} alt={name}/>
        <p>Crop Image</p>
        <form onSubmit={this.handleSubmit} className="previewForm">
          <input 
          type="number" 
          placeholder="xStart"
          name="xStart"
          onChange={this.handleChange}/>
          <input 
          type="number" 
          placeholder="xEnd"
          name="xEnd"
          onChange={this.handleChange}/>
          <input 
          type="number" 
          placeholder="yStart"
          name="yStart"
          onChange={this.handleChange}/>
          <input 
          type="number" 
          placeholder="yEnd"
          name="yEnd"
          onChange={this.handleChange}/>
          <button type="submit" onClick={this.handleSubmit}>Crop</button>  
        </form>
      </div>
    );
  }
}

export default connect()(PreviewImage);