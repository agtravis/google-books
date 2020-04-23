import React from 'react';
import Result from '../Result';

function ResultsContainer(props) {
  return (
    <div>
      {props.array.map((book, index) => {
        return (
          <Result
            key={index}
            id={book._id ? book._id : index}
            title={book.title}
            authors={book.authors}
            description={book.description}
            image={book.image}
            link={book.link}
            saved={book.saved}
            interactWithFavorites={props.interactWithFavorites}
            actionName={props.actionName}
            addClassName={props.addClassName}
            deleteClassName={props.deleteClassName}
          />
        );
      })}
    </div>
  );
}

export default ResultsContainer;
