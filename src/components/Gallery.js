import React, { Component } from 'react';
import { connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';
import Image from './Image';
import { Link } from 'react-router-dom';

class Gallery extends Component {
  state = {
    isLoading : true
  }
  
  componentDidMount() {
    // dispatching action for getting all images
    this.props.dispatch(imageActions.getGallery((dataStatus) => {
      if ( dataStatus ) {
        this.setState({
          isLoading: false
        })
      }
    }))
  }

  render() {
    const { isLoading } = this.state;
    const { gallery } = this.props;

    return (
      <div>
        <Link to="/">Add Image</Link>
        <h3>Gallery</h3>
        {
          isLoading ? <p>Loading...</p> : (
            gallery && gallery.map(val => (
              <React.Fragment key={val.createdAt}>
                {
                  console.log(val)
                }
                {
                  val.urls.map((url, i) => (
                    <Image { ...url } createdAt={val.createdAt} key={i}/>
                  ))
                }
              </React.Fragment>
            ))            
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { gallery } = state;
  console.log(gallery);
  return { gallery };
}

export default connect(mapStateToProps)(Gallery);