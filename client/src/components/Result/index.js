import React from 'react';
import './style.css';

function Result(props) {
  return (
    <div id={`book-card${props.id}`}>
      <div className="card-header">
        <div className="title-author">
          {props.title ? <h4>{props.title}</h4> : null}
          {props.authors ? (
            <p>{props.authors[0]}</p>
          ) : (
            'No Author Info Available'
          )}
        </div>
        <div className="card-options">
          {props.link ? (
            <a href={props.link} target="_blank" rel="noopener noreferrer">
              View in Google Books
            </a>
          ) : null}
          <p
            onClick={() =>
              props.saveToFavorites({
                authors: props.authors,
                description: props.description,
                image: props.image,
                link: props.link,
                title: props.title,
              })
            }
          >
            Save to Favorites
          </p>
        </div>
      </div>
      <div className="card-contents">
        <div className="card-thumbnail">
          {props.image ? (
            <img
              src={props.image}
              alt={props.title ? props.title : 'no title'}
            />
          ) : (
            'No Image Available'
          )}
        </div>
        <div className="card-details">
          {props.description ? (
            <p>{props.description}</p>
          ) : (
            'No Description Available'
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Result;
