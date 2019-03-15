import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Header extends Component {
  render() {
    const {pathname} = this.props.location;
    
    return (
      <header>
        <div className="wrapper grid-2">
          <h1>Image Manipulator</h1>
          <nav>
            {
              !/gallery/.test(pathname) ? 
              <Link to="/gallery" className="btn">Gallery</Link> : <Link to="/" className="btn">Upload Image</Link>
            }
          </nav>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);