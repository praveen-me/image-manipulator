import React, { Component } from 'react';
import { connect } from 'react-redux';
import PreviewImage from './PreviewImage';

class Preview extends Component {
  render() {
    const { currentConvertedUrls } = this.props;
    
    return (
      <section>
        {  
          currentConvertedUrls && (
            <>
            <h3>Preview</h3>
            {
              currentConvertedUrls.map((image, i) => (
              <PreviewImage {...image} key={i} />
              ))
            }
            </>
          )
        }
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { currentConvertedUrls } = state;
  return { 
    currentConvertedUrls
  }
}

export default connect(mapStateToProps)(Preview);
