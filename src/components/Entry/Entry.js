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

  const { tripId, entryId, entrySlug } = props.match.params;
  const trip = trips.find(trip => trip.id === tripId);
  const entry = trip.entries.find(entry => entry.id === entryId);

  const thumbnails = entry.photos && entry.photos.map(photo => {
    return (<Link key={photo.id} to={`/${tripId}/${entryId}-${entrySlug}/${photo.id}`}>
      <Thumbnail tripId={tripId} {...photo} />
    </Link>);
  });

  let previewPhoto = entry.previewPhoto || entry.photos && entry.photos[0].id;
  const previewThumbnailUrl = `https://roadtrips.iwazaru.fr/images/${tripId}/thumbs/${previewPhoto}.jpg`;

  const onOverlayClick = () => props.history.push(`/${trip.id}/`);

  return (
    <Fragment>
      <Overlay onClick={onOverlayClick} className="Entry-overlay" />
      <article className="Entry">
        <Helmet>
          <title>{entry.id}. {entry.title} — {trip.title}</title>
          <meta name="description" content="Nested component" />
          <meta property="og:title"
            content={`${entry.id}. ${entry.title} - ${trip.title}`} />
          <meta property="og:url"
            content={`https://roadtrips.iwazaru.fr/${tripId}/${entry.id}-${entrySlug}`} />
          <meta property="og:image" content={previewThumbnailUrl} />
          <meta property="og:description" content={entry.content} />
        </Helmet>
        <span className="Entry-date">{entry.date}</span>
        <div className="Entry-id">
          <Pin>{entry.id}</Pin>
        </div>
        <Link to={`/${trip.id}/`}>
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
