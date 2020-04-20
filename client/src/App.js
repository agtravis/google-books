import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Wrapper from './components/Wrapper';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ``,
      googleBooksResponse: [],
    };
  }

  handleChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // alert(this.state.searchText);
    const URL = `https://www.googleapis.com/books/v1/volumes?q=${this.state.searchText}&key=AIzaSyDbD1aa0j9dmJv5m_IGyKWHQ_hWgItANl4`;
    axios
      .get(URL)
      .then((res) => {
        this.setState({ googleBooksResponse: res.data.items });
        this.setState({ searchText: `` });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <Router>
        <Header />
        <NavBar
          searchText={this.state.searchText}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Wrapper>HEllo</Wrapper>
      </Router>
    );
  }
}

export default App;
