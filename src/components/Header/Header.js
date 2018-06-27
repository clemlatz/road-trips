import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.scss';

export default function Header({ selectedTrip }) {

  let title = 'Road Trips';
  let subtitle = 'Journal de voyage de Mathilde & Clément';
  let link = '/';
  let logo = (
    <img className="logo" src="/images/icons/favicon-32x32.png" height='32'
      title="Icon by Freepik.com from Flaticon | CC BY 3.0"
    />
  );
  if (selectedTrip) {
    title = selectedTrip.title;
    subtitle = selectedTrip.subtitle;
    link = `/${selectedTrip.id}/`;
    logo = null;
  }

  return (
    <div className="Header">
      <Link to={link}>
        <h1 className="title">{logo} {title}</h1>
        <p className="subtitle">{subtitle}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  selectedTrip: PropTypes.object,
};
