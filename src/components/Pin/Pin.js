import React from 'react';
import PropTypes from 'prop-types';

import './Pin.scss';

export default function Pin({ onClick, children }) {
  return <div onClick={onClick} className="Pin">{children}</div>;
}

Pin.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
