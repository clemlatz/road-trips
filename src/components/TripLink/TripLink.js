import React from 'react';

import Header from '../Header/Header';

export default function TripLink({ onClick, children, trip }) {
  return (
    <div onClick={onClick}>
      {trip.title}
    </div>
  );
}