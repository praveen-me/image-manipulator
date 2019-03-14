import React, { Component } from 'react';
import AddImage from './AddImage';
import {connect} from 'react-redux';
import ViewConverted from './ViewConverted';


class Main extends Component {
  render() {
    const {currentConvertedUrls} = this.props;
    
    return (
      <main>
        <AddImage />
        {  
          currentConvertedUrls && currentConvertedUrls.map((image, i) => (
            <ViewConverted {...image} key={i}/>
          ))
        }
      </main>
    );
  }
}

function mapStateToProps(state) {
  const { currentConvertedUrls } = state;

  return { 
    currentConvertedUrls
  }
}

export default connect(mapStateToProps)(Main);