import React from 'react';
import Button from '../Button';
import './style.css';

function SearchForm(props) {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div id="search-bar" className="col s12 m12 l12">
            <form id="search-bar-form">
              <input
                type="text"
                placeholder="Search for a full or partial title of a book"
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
      </div>
    </div>
  );
}

export default SearchForm;
