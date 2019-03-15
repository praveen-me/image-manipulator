import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import imageActions from '../store/actions/image.actions';

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

    return (
      <div className="wrapper">
        <h2 className="center head">Gallery</h2>
        {
          isLoading ? <p>Loading...</p> : (
            gallery && gallery.map(val => (
              <React.Fragment key={val.createdAt}>
                {
                  val.urls.map((url, i) => (
                    <Suspense class="fallback">
                      <Image { ...url } createdAt={val.createdAt} key={i}/>
                    </Suspense>
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