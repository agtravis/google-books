import React from 'react';
import './style.css';
import Result from '../Result';

function ResultsContainer(props) {
  return (
    <div>
      {props.array.map((book, index) => {
        return <Result key={index} id={index} title={book.volumeInfo.title} />;
      })}
    </div>
  );
}

export default ResultsContainer;
