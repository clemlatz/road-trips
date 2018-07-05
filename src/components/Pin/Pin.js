import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Pin.scss';

export default function Pin({ href, children }) {
  const classes = ['Pin'];
  if (href) {
    classes.push('clickable');
  }

  const pin = <div className={classes.join(' ')}>{children}</div>;

  if (href) {
    return <Link to={href}>{pin}</Link>;
  }

  return pin;
}

Pin.defaultProps = {
  onClick: null
};

Pin.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
};
