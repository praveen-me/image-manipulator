import React from 'react';

const Image = (props) => {
  const {type, url, name, createdAt} = props;

  return (
    <div className="image-block center">
      <h4>Image Type - {type}</h4>
      <img src={url} alt={name}/>
      <p>Created At - {new Date(createdAt).toDateString()}</p>
    </div>
  )
};

export default Image;