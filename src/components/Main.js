import React, { Component } from 'react';
import {connect} from 'react-redux';

import AddImage from './AddImage';
import Preview from './Preview';

import imageActions from '../store/actions/image.actions';

class Main extends Component {
  state = {
    isLoading: false
  }

  // for submitting images finally
  handleSubmit = e => {
    e.preventDefault();
    
    // first setting isLoading : true for loader
    this.setState({
      isLoading : true
    }, () => {
      // Dispatching action for submitting images
      this.props.dispatch(imageActions.submitForm((dataStatus) => {
        if(dataStatus) {
          // After posting successful request redirect to gallery
          this.props.history.push('/gallery')
        }
      }))
    })
  }

  render() {
    const { isLoading } = this.state;
    return (
      <main>
        {
          isLoading ? <p>Loading...</p> : (
            <>
              <AddImage atSubmit={this.handleSubmit}/>
              <Preview />
            </>
          )
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