import React from 'react';
import './style.css';

function Button(props) {
  return (
    <button id={props.id} onClick={(event) => props.handleSubmit(event)}>
      Search
    </button>
  );
}

export default Button;
