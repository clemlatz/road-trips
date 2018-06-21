import React from 'react';
import PropTypes from 'prop-types';

import './Overlay.scss';

export default function Overlay({ onClick, zIndex }) {
  return <div style={{ zIndex }} onClick={onClick} className="Overlay"></div>;
}

Overlay.defaultProps = {
  zIndex: 100,
};

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  zIndex: PropTypes.number,
};
