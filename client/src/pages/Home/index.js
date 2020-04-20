import React from 'react';
import './style.css';
import Title from '../../components/Title';
import SearchForm from '../../components/SearchForm';

function Home(props) {
  return (
    <div>
      <Title title="Search" />
      <SearchForm
        searchText={props.searchText}
        handleChange={props.handleChange}
        handleSubmit={props.handleSubmit}
      />
    </div>
  );
}

export default Home;
