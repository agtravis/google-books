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
        </div>
      ) : null}

      {/* <ResultsContainer array={props.googleBooksResponse} /> */}
    </div>
  );
}

export default Home;
