import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function NavBar(props) {
  return (
    <nav>
      <div id="nav-bar">
        <Link to="/">
          <p>Search</p>
        </Link>
        <Link to="/saved">
          <p>Saved ({props.numBooks})</p>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
