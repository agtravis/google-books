import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Wrapper from './components/Wrapper';
import axios from 'axios';
import API from './utils/API';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ``,
      googleBooksResponse: [],
      favoriteBooksResponse: [],
      lastSearch: ``,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = () => {
    API.getBooks()
      .then((res) => {
        this.setState({ favoriteBooksResponse: res.data });
      })
      .catch((err) => console.error(err));
  };

  handleChange = (event) => {
    this.setState({ searchText: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const URL = `https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.searchText}&key=AIzaSyDbD1aa0j9dmJv5m_IGyKWHQ_hWgItANl4`;
    axios
      .get(URL)
      .then((res) => {
        this.setState({ googleBooksResponse: res.data.items });
        this.setState({ lastSearch: this.state.searchText });
        this.setState({ searchText: `` });
      })
      .catch((err) => console.error(err));
  };

  saveToFavorites = (bookObject) => {
    API.saveBook(bookObject)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <Router>
        <Header />
        <NavBar />
        <Wrapper>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  searchText={this.state.searchText}
                  lastSearch={this.state.lastSearch}
                  googleBooksResponse={this.state.googleBooksResponse}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  saveToFavorites={this.saveToFavorites}
                />
              )}
            />
            <Route exact path="/saved" component={Saved} />
          </Switch>
        </Wrapper>
      </Router>
    );
  }
}

export default App;
