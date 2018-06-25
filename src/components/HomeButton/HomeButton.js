import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe'

import './HomeButton.scss';

export default function HomeButton({ shown }) {
  
  const homeButtonClasses = ['homeButton'];

  if (!shown) {
    homeButtonClasses.push('hidden');
  }

  return (
    <Link to="/">
      <div className={homeButtonClasses.join(' ')}>
        <FontAwesomeIcon icon={faGlobe} />
      </div>
    </Link>
  );
};

HomeButton.defaultProps = {
  shown: false,
};

HomeButton.propTypes = {
  shown: PropTypes.bool.isRequired,
};
