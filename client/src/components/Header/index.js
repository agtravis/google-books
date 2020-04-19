import React from 'react';
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Header() {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div id="header-title" className="col s12 m12 l12">
            <h1>George's Books</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
