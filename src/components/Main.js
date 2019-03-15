import React, { Component } from 'react';
import AddImage from './AddImage';
import {connect} from 'react-redux';
import Preview from './Preview';

import imageActions from '../store/actions/image.actions';

class Main extends Component {
  state = {
    isLoading: false
  }

  handleSubmit = e => {
    e.preventDefault();
    
    this.setState({
      isLoading : true
    }, () => {
      this.props.dispatch(imageActions.submitForm((dataStatus) => {
        if(dataStatus) {
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