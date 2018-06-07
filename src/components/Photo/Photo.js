import React from 'react';
import PropTypes from 'prop-types';

import './Photo.scss';

export default function Photo({ id, caption }) {
  return (
    <div className="Photo">
      <img className="Photo-image" src={`/data/thumbs/${id}.jpg`} alt={caption} />
      {caption && <p className="Photo-caption">{caption}</p>}
    </div>
  );
}

Photo.propTypes = {
  caption: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
