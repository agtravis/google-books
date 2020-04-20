import React from 'react';
import './style.css';
import Result from '../Result';

function ResultsContainer(props) {
  return (
    <div>
      {props.array.map((book, index) => {
        return (
          <Result
            key={index}
            id={index}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            description={book.volumeInfo.description}
            image={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : null
            }
            link={book.volumeInfo.infoLink}
            saveToFavorites={props.saveToFavorites}
          />
        );
      })}
    </div>
  );
}

export default ResultsContainer;
