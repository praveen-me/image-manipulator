import React, { Component } from 'react';

class PreviewImage extends Component {
  render() {
    const { url, type, name } = this.props;

    return (
      <div>
        <h3>{type}</h3>
        <img src={url} alt={name}/>
      </div>
    );
  }
}

export default PreviewImage;