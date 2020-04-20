import React from 'react';
import './style.css';

function Result(props) {
  return (
    <div>
      {props.title ? <h3>{props.title}</h3> : null}
      {props.authors ? <p>{props.authors[0]}</p> : null}
      {props.image && props.title ? (
        <img src={props.image} alt={props.title} />
      ) : null}
      <br />
      {props.link ? <a href={props.link}>{props.link}</a> : null}
      {props.description ? <p>{props.description}</p> : null}
      <hr />
    </div>
  );
}

export default Result;
