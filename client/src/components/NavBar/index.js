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
          <p>Saved</p>
        </Link>
      </div>
      {/* <div className="container">
        <div className="row">
          <div id="nav-bar" className="col s12 m12 l12">
            <form id="nav-bar-form">
              <input
                type="text"
                placeholder="Search..."
                id="search-field"
                value={props.searchText}
                onChange={(event) => props.handleChange(event)}
              />
              <Button
                handleSubmit={props.handleSubmit}
                id="search-submit-button"
              />
            </form>
          </div>
        </div>
      </div> */}
    </nav>
  );
}

export default NavBar;
