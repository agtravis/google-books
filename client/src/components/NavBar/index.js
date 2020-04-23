import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function NavBar(props) {
  return (
    <nav>
      <div id="nav-bar">
        <Link to="/">
          <p>Search</p>
        </Link>
        <Link to="/saved">
          <p>Favorites ({props.numBooks})</p>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
