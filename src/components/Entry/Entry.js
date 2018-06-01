import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Photo from '../Photo/Photo';

import './Entry.scss';

import entries from '../../data/entries.json';

export default (props) => {

  const id = props.match.params.id;
  const entry = entries.find(entry => entry.id === id);

  const photos = entry.photos.map(photo => <Photo key={photo.id} {...photo} />)

  const onOverlayClick = () => props.history.push('/');

  return (
    <Fragment>
      <div className="Entry-overlay" onClick={onOverlayClick}></div>
      <article className="Entry">
        <Helmet>
          <title>{entry.title} — Road Trip en Islande</title>
          <meta name="description" content="Nested component" />
          <meta property="og:title" content={entry.title} />
        </Helmet>
        <span className="Entry-date">{entry.date}</span>
        <span className="Entry-id">{entry.id}</span>
        <Link to="/">
          <span className="Entry-close-button">×</span>
        </Link>
        <h1 className="Entry-title">{entry.title}</h1>
        <p className="Entry-content">{entry.content}</p>
        {photos}
      </article>
    </Fragment>
  )
};
