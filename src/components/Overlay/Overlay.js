import React from 'react';
import PropTypes from 'prop-types';

import './Overlay.scss';

export default function Overlay({ onClick }) {
  return <div onClick={onClick} className="Overlay"></div>;
}

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
