import React from 'react';

function Base64Image({ src, width }) {
  const dataUrl = `data:image/png;base64,${src}`;

  return <img src={dataUrl} alt="Base64 Image" width={width}/>;
}

export default Base64Image;