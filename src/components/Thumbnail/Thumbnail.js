import React from 'react';
import PropTypes from 'prop-types';

import './Thumbnail.scss';

export default function Thumbnail({ id, caption }) {
  return (
    <div className="Thumbnail">
      <img className="Thumbnail-image" src={`/data/thumbs/${id}.jpg`}
        alt={caption} />
      {caption && <p className="Thumbnail-caption">{caption}</p>}
    </div>
  );
}

Thumbnail.propTypes = {
  caption: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
