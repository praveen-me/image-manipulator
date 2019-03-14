import React, { Component } from 'react';
import AddImage from './AddImage';
import {connect} from 'react-redux';
import ImageResizer from './ImageResizer';

class Main extends Component {
  render() {
    const {image} = this.props;
    
    return (
      <main>
        <AddImage />
        {
          image ? (
            <ImageResizer imgHeight={600} imgWidth={300} image={image}/>
          ) : ''
        }
      </main>
    );
  }
}

function mapStateToProps(state) {
  const {image} = state;
  return {
    image
  }
}

export default connect(mapStateToProps)(Main);