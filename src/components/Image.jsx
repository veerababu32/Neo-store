import React, { useState } from 'react';

function Image({ className, src, alt, style }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className={`${className}`} style={style}>
      {isLoading && <div className="shimmer"></div>}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

export default Image;
