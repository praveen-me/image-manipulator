import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';
import { Link } from 'react-router-dom';

const Image = lazy(() => import('./Image'));

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

    let displayGallery = [];

    // show latest images on top
    if (!isLoading && gallery.length) {
      displayGallery = [...gallery.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())]
    } else {
      displayGallery = []
    }

    return (
      <div className="wrapper">
        <h2 className="center head">Gallery</h2>
        {
          isLoading ? <p>Loading...</p> : (
            displayGallery && displayGallery.length ? (
              displayGallery.map(val => (
                <React.Fragment key={val.createdAt}>
                    {
                      val.urls.map((url, i) => (
                        <Suspense fallback={"Loading..."} key={i}>
                          <Image { ...url } createdAt={val.createdAt}/>
                        </Suspense>
                      ))
                    }
                  </React.Fragment>
                ))           
            ) : (
              <div className="info wrapper center">
                <p>No Images Found. Please Upload Images</p>
                <Link to="/" className="btn">Upload Images</Link>
              </div>
            )
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { gallery } = state;

  return { gallery };
}

export default connect(mapStateToProps)(Gallery);