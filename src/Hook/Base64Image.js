import React from 'react';

function Base64Image({ src }) {
  const dataUrl = `data:image/png;base64,${src}`;

  return <img src={dataUrl} alt="Base64 Image" width={300}/>;
}

export default Base64Image;