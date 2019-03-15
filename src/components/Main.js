import React, { Component } from 'react';
import AddImage from './AddImage';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Preview from './Preview';


class Main extends Component {
  render() {
    
    return (
      <main>
        <Link to="/gallery">Gallery</Link>
        <AddImage />
        <Preview />
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