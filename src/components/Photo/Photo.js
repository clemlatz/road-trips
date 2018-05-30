import React from 'react';

import './Photo.scss';

export default ({ id, caption }) => (
  <div className="Photo">
    <img className="Photo-image" src={`data/thumbs/${id}.jpg`} alt={caption} />
    {caption && <p class="Photo-caption">{caption}</p>}
  </div>
);