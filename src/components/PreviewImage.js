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
    const {xStart, xEnd, yStart, yEnd} = this.state;

    return (
      <div className="center preview-block">
        <h3 className="preview-head">{type}</h3>
        <img src={url} alt={name}/>
        <p>Crop Image</p>
        <form onSubmit={this.handleSubmit} className="previewForm">
          <div className="label-block">
            <label htmlFor="xStart">xStart</label>
            <input 
            type="number" 
            value={xStart}
            name="xStart"
            onChange={this.handleChange}/>
          </div>
          <div className="label-block">
            <label htmlFor="yStart">yStart</label>
            <input 
            type="number" 
            value={yStart}
            name="yStart"
            onChange={this.handleChange}/>
          </div>
          <div className="label-block">
            <label htmlFor="xEnd">xEnd</label>
            <input 
            type="number" 
            value={xEnd}
            name="xEnd"
            onChange={this.handleChange}/>
          </div>
          <div className="label-block">
            <label htmlFor="yEnd">yEnd</label>
            <input 
            type="number" 
            value={yEnd}
            name="yEnd"
            onChange={this.handleChange}/>
          </div>
          <button type="submit" onClick={this.handleSubmit}>Crop</button>  
        </form>
      </div>
    );
  }
}

export default connect()(PreviewImage);