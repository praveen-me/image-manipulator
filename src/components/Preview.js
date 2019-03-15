import React from 'react';
import { connect } from 'react-redux';
import PreviewImage from './PreviewImage';

const Preview = (props) => {
  const { currentConvertedUrls } = props;
  
  return (
    <section>
      {  
        currentConvertedUrls && (
          <>
          <h3 className="center head">Preview</h3>
          {
            currentConvertedUrls.map((image, i) => (
            <PreviewImage {...image} index={i} key={i} />
            ))
          }
          </> 
        )
      }
    </section>
  );
}

function mapStateToProps(state) {
  const { currentConvertedUrls } = state;
  return { currentConvertedUrls }
}

export default connect(mapStateToProps)(Preview);
