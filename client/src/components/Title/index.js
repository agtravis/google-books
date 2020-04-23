import React from 'react';
import './style.css';

function Title(props) {
  const fontSize = props.size ? props.size : '1.75rem';

  return (
    <div id="title-text">
      <p style={{ fontSize: fontSize }}>{props.title}</p>
    </div>
  );
}

export default Title;
