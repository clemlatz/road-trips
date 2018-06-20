import React from 'react';
import PropTypes from 'prop-types';

import './Header.scss';

export default function Header({ selectedTrip }) {

  let title = 'Road Trips';
  let subtitle = 'Journal de voyage de Mathilde & Clément';
  if (selectedTrip) {
    title = selectedTrip.title;
    subtitle = selectedTrip.subtitle;
  }

  return (
    <div className="Header">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
}

Header.propTypes = {
  selectedTrip: PropTypes.object,
};
