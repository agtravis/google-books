import React from 'react';
import './style.css';

function Result(props) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.authors[0]}</p>
      <img src={props.image} alt={props.title} />
      <a href={props.link}>{props.link}</a>
      <p>{props.description}</p>
      <hr />
    </div>
  );
}

export default Result;
