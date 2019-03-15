import React from 'react';

const Image = (props) => {
  const {type, url, name, createdAt} = props;

  return (
    <div className="image-block">
      <h4>{type}</h4>
      <img src={url} alt={name}/>
      <p>{new Date(createdAt).toDateString()}</p>
    </div>
  )
};

export default Image;