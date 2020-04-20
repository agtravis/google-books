import React from 'react';
import './style.css';
import Title from '../../components/Title';
import SearchForm from '../../components/SearchForm';
import ResultsContainer from '../../components/ResultsContainer';

function Home(props) {
  return (
    <div>
      <Title title="Search" />
      <SearchForm
        searchText={props.searchText}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
      />
      {props.lastSearch.length ? (
        <div>
          <Title title={`Search results for ${props.lastSearch}:`} />
          <hr />
        </div>
      ) : null}

      {props.googleBooksResponse !== undefined ? (
        <div>
          <ResultsContainer
            array={props.googleBooksResponse.map((book) => {
              return {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : null,
                link: book.volumeInfo.infoLink,
              };
            })}
            interactWithFavorites={props.saveToFavorites}
            actionName="Add To Favorites"
            addClassName=""
            deleteClassName="hide"
          />
        </div>
      ) : (
        <p>Try another search?</p>
      )}
    </div>
  );
}

export default Home;
