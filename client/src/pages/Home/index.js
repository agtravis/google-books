import React from 'react';
import './style.css';
import Title from '../../components/Title';
import SearchForm from '../../components/SearchForm';
import ResultsContainer from '../../components/ResultsContainer';

function Home(props) {
  return (
    <div>
      <Title title="Search Google Books API" />
      <SearchForm
        searchText={props.searchText}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
      />
      {props.lastSearch.length ? (
        <div>
          <Title
            title={`Search results for ${props.lastSearch}:`}
            size="1.25rem"
          />
          <hr />
        </div>
      ) : (
        <Title title={`Search results will appear below...`} size="1.25rem" />
      )}

      {props.googleBooksResponse !== undefined ? (
        <div>
          <ResultsContainer
            array={props.googleBooksResponse.map((book) => {
              let saved = false;
              for (const favoriteBook of props.favoriteBooksResponse) {
                if (book.volumeInfo.infoLink === favoriteBook.link) {
                  saved = true;
                  break;
                }
              }
              return {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : null,
                link: book.volumeInfo.infoLink,
                saved: saved,
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
