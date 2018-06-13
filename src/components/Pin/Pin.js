import React from 'react';
import PropTypes from 'prop-types';

import './Pin.scss';

export default function Pin({ onClick, children }) {
  const classes = ['Pin'];
  if (onClick) {
    classes.push('clickable');
  }

  return <div onClick={onClick} className={classes.join(' ')}>{children}</div>;
}

Pin.defaultProps = {
  onClick: null
};

Pin.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
