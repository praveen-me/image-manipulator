import React, { Component } from 'react';

class PreviewImage extends Component {
  render() {
    const { url, type, name } = this.props;

    return (
      <div className="center preview-block">
        <h3 className="preview-head">{type}</h3>
        <img src={url} alt={name}/>
      </div>
    );
  }
}

export default PreviewImage;