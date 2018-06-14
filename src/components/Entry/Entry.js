import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail/Thumbnail';
import Overlay from '../Overlay/Overlay';
import Pin from '../Pin/Pin';

import './Entry.scss';

import trips from '../../trips/trips.json';

export default function Entry(props) {

  const { tripId, entryId } = props.match.params;
  const trip = trips.find(trip => trip.id === tripId);
  const entry = trip.entries.find(entry => entry.id === entryId);

  const thumbnails = entry.photos.map(photo => {
    return (<Link key={photo.id} to={`/${tripId}/${entryId}/${photo.id}`}>
      <Thumbnail tripId={tripId} {...photo} />
    </Link>);
  });
  const previewThumbnail = entry.photos[0];
  const previewThumbnailUrl = `https://roadtrips.iwazaru.fr/images/${tripId}/thumbs/${previewThumbnail.id}.jpg`;

  const onOverlayClick = () => props.history.push('/');

  return (
    <Fragment>
      <Overlay onClick={onOverlayClick} />
      <article className="Entry">
        <Helmet>
          <title>{entry.title} — {trip.title}</title>
          <meta name="description" content="Nested component" />
          <meta property="og:title"
            content={`${entry.title} - Road Trip en Islande`} />
          <meta property="og:url"
            content={`https://roadtrips.iwazaru.fr/${tripId}/${entry.id}`} />
          <meta property="og:image" content={previewThumbnailUrl} />
        </Helmet>
        <span className="Entry-date">{entry.date}</span>
        <div className="Entry-id">
          <Pin>{entry.id}</Pin>
        </div>
        <Link to="/">
          <span className="Entry-close-button">×</span>
        </Link>
        <h1 className="Entry-title">{entry.title}</h1>
        <p className="Entry-content">{entry.content}</p>
        {thumbnails}
      </article>
    </Fragment>
  );
}

Entry.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};
