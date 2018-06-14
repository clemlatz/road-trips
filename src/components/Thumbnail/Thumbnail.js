import React from 'react';
import PropTypes from 'prop-types';

import './Thumbnail.scss';

export default function Thumbnail({ id, caption, tripId }) {
  return (
    <div className="Thumbnail">
      <img className="Thumbnail-image" src={`/images/${tripId}/thumbs/${id}.jpg`}
        alt={caption} />
      {caption && <p className="Thumbnail-caption">{caption}</p>}
    </div>
  );
}

Thumbnail.propTypes = {
  caption: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tripId: PropTypes.string.isRequired,
};
