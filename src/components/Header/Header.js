import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header({ selectedTrip }) {

  let title = 'Road Trips';
  let subtitle = 'Journal de voyage de Mathilde & Clément';
  let link = '/'; 
  if (selectedTrip) {
    title = selectedTrip.title;
    subtitle = selectedTrip.subtitle;
    link = `/${selectedTrip.id}/`;
  }

  return (
    <div className="Header">
      <Link to={link}>
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  selectedTrip: PropTypes.object,
};
