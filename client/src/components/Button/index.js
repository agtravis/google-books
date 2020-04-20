import React from 'react';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Button(props) {
  return (
    <button id={props.id} onClick={(event) => props.handleSubmit(event)}>
      Search
    </button>
  );
}

export default Button;
