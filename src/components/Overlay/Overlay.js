import React from 'react';
import PropTypes from 'prop-types';

import './Overlay.scss';

export default function Overlay({ onClick, className }) {
  const classes = ['Overlay'];
  classes.push(className);
  return <div onClick={onClick} className={classes.join(' ')}></div>;
}

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
