import React from 'react';
import './style.css';
import Title from '../../components/Title';
import ResultsContainer from '../../components/ResultsContainer';

function Saved(props) {
  return (
    <div>
      <Title title="Your Favorites" />

      {props.favoriteBooksResponse.length > 0 ? (
        <div>
          <ResultsContainer
            array={props.favoriteBooksResponse}
            interactWithFavorites={props.deleteFromFavorites}
            actionName="Delete From Favorites"
            addClassName="hide"
            deleteClassName=""
          />
        </div>
      ) : (
        <p>You haven't added any books yet!</p>
      )}
    </div>
  );
}

export default Saved;
