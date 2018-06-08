import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail/Thumbnail';
import Overlay from '../Overlay/Overlay';

import './Entry.scss';

import entries from '../../data/entries.json';

export default function Entry(props) {

  const id = props.match.params.id;
  const entry = entries.find(entry => entry.id === id);

  const thumbnails = entry.photos.map(photo => <Thumbnail key={photo.id} {...photo} />);
  const previewThumbnail = entry.photos[0];
  const previewThumbnailUrl = `https://roadtrips.iwazaru.fr/data/Thumbnails/${previewThumbnail.id}.jpg`;

  const onOverlayClick = () => props.history.push('/');

  return (
    <Fragment>
      <Overlay onClick={onOverlayClick} />
      <article className="Entry">
        <Helmet>
          <title>{entry.title} — Road Trip en Islande</title>
          <meta name="description" content="Nested component" />
          <meta property="og:title"
            content={`${entry.title} - Road Trip en Islande`} />
          <meta property="og:url"
            content={`https://roadtrips.iwazaru.fr/entry/${entry.id}`} />
          <meta property="og:image" content={previewThumbnailUrl} />
        </Helmet>
        <span className="Entry-date">{entry.date}</span>
        <span className="Entry-id">{entry.id}</span>
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
