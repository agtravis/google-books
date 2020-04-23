# Google books app

This app is a full MERN (MongoDB/Express/React/Node) stack application that lets a user look for books, and if the user wants to they can save any book to a database for quick access at a later date. The user can also remove these 'favorited' books from the database. It uses the Google Books API for the front end, and then my own API for interacting with the database.

Check out the repo [here](https://github.com/agtravis/google-books), and see the app in operation [here](https://agtravis-google-books.herokuapp.com/).

This app runs in the browser - see [Setup](#setup) below for instructions on how to use.

## Table of contents

- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Code Examples](#code-examples)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

## Screenshots

![App-In-Action](./client/public/assets/images/screenshots/app-in-action.gif)

## Technologies

This app was written in Node using the React JavaScript and JSX library. Since it is a full stack application with React, it has two `package.json` files.

### Front End `package.json`

```js
  "proxy": "http://localhost:3001/",
  "dependencies": {
    "axios": "^0.19.2"
  },
```

A lot of this file is set up automatically by `create-react-app`, so I have only put here what I have added. This is a very simple app, and it only uses `axios` to make my `http` requests. More on some of that later. The `proxy` is so that a specific second server is set up for the front end (during `development` mode) for easy programming and can communicate with the second server.

### Back End `package.json`

```js
  "main": "server.js",
  "scripts": {
    "start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
    "start:prod": "node server.js",
    "start:dev": "concurrently \"nodemon --ignore 'client/*'\" \"npm run client\"",
    "client": "cd client && npm run start",
    "seed": "node scripts/seedDB.js",
    "install": "cd client && npm install",
    "build": "cd client && npm run build",
    "heroku-postbuild": "npm run build"
  },
  "devDependencies": {
    "concurrently": "^5.1.0",
    "nodemon": "^2.0.2"
  },
  "dependencies": {
    "axios": "^0.19.2",
    "express": "^4.17.1",
    "if-env": "^1.0.4",
    "mongoose": "^5.9.7"
  }
```

Again, I am being selective, but highlighting the important parts. The scripts are how the app knows how to behave when certain commands are run in different modes (`development`/`production`), including what to do to seed the database (not necessary for this app, but included anyway), or build it (which will create a minified and hashed code versus an easy to read human code). In the `devDependencies` is a module called `concurrently`, and this is how the app knows to connect the two servers in `development` mode. In `dependencies`, again we have `axios` for database interactions along with `mongoose`, `express` for so many things (primarily setting up the server and enabling middleware usage), and `if-env` which enables the scripts to run dependent on the mode.

## Code Examples

Let's follow the journey of the user - in fact this will be the exact journey shown in the `gif` (that's a HARD 'G' by the way!) in the screenshots section.

### 1. User lands on page

Nothing noticable happens when the page is accessed, however, that's not actually the case. In the class `App` in app.js, observe the following code:

```js
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
```

`componentDidMount` is a built in method (or `hook`) that React has that say to wait for the component to be rendered in the DOM _before_ calling this function. This is so that if the app has to make an expensive API call, the bones of the webpage can be loaded so that the user isn't sat looking at a blank loading screen. In this case, is is calling an API response that goes to my database and requests a returned object - ALL of the books the user has saved to their favorites list. Here's what that looks like in the front end API:

```js
  getBooks() {
    return axios.get(`/api/books`);
  }
```

At that point, the books array is stored in the state in this component:

![state](./client/public/assets/images/screenshots/state.PNG).

While on this page (this is really a single page application posing as multiple pages), the only information being accessed is the length of the array in the `NavBar` component - in parentheses is the number of books the user has added, and as you can see in the `gif` above, this number changes when the user interacts with the state like this.

### 2. User Searches for a book

Code first:

```js
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
```

There is only one input field, so the `handleChange` method does not need any conditionals or switch statement to identify which property of the state needs to be updated. This simply means that as the user types, the state is updated. The benefit to doing this, as opposed to waiting for the user to finish typing, is that the app could act at any point on what the user has typed, perhaps by running a setTimout function if the user stops typing for half a second, or displaying the text in another location without reloading the whole page. However, that is not necessary, I am just following convention in this case.

`handleSubmit` is a little more involved, and additionally so because I have the full API request written in here. I might want to move this to a more suitable location, perhaps creating a second API in the `utils` directory on the front end. However, this is a simple `GET` request, and the URL is already constructed with a template literal (not that the URL states `intitle`, this means the search term variable can be a substring of the whole title) ready to go thanks to the state, and then with the response the array for the response in the state is populated. This state is then passed to the component that renders the results, however some processing is done in that component before it renders:

```js
{
  props.googleBooksResponse !== undefined ? (
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
  );
}
```

Passed via `props`, this component renders another component conditionally via a ternary statement that checks to see if the array has been populated by a valid search first. If not, a message appears. If the response has been valid, then the appropriate selected information from the response is passed to the rendering component for the data, but first it is formatted into a specific custom object. This includes a new property `saved`.

This property is declared as a `let` and starts out false. This is a property that will determine if the user has already saved this exact book to their favorites list, and so performs a quick comparative analysis of the most unique property available in both arrays (a URL address), and determines if the user already has it in their list. If found, the boolean variable is set to true, and the loop can end early since there would only be one instance of this match - the user is later disabled from adding multiple copies of the same book to their list.

NOTE: The Google API does not always contain all the values needed. If the value doesn't exist, the property doesn't exist, and so in order to render, ternaries have to be inserted at the endpoint to ensure a default behavior is written so React knows what to render if the value doesn't exist.

Why not simply pass the whole response into the component and then have that component do the work of parsing or traversing through it? The reason is because I want that rendering component to be multipurpose. I want it to be able to be used to render books returned from the Google API and my own database. Alternatively, I could set my database up to reflect the structure of the Google response, but the Google response has many many properties, and properties with properties, and arrays of properties, and my database objects only have 5 properties total (not including the default values like ID and Date Created).

Re-usability is one of the main awesome reasons to be utilizing a tool like React. In order to facilitate this, there are a few `string` props that are passed that will be utilized as `className`s, so that the child component knows whether or not to render that particular element or not - for example the button that will either add or delete a book from favorites.

This rendering component then runs a map on the array passed (be it Google or my DB) to create a list of components as follows:

```js
{
  props.array.map((book, index) => {
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
  });
}
```

...and this creates a list that looks like this:

![state](./client/public/assets/images/screenshots/search.PNG)

At this point, the user can choose to view more details on the book or even purchase the book by opening a new window and going to Google, or, as demonstrated in the `gif`, they can add to favorites.

### 3. User Adds a Book to Favorites

In the component for the individual books displayed in the 'Search' home-page, the second button allows the user to add a book to their list of favorites. The function being passed in is a prop with a generic name, but further up the prop tree the function passed depends on the eventual usage of the component. This way, the so-called 'dumb' components do not need to know what the function is, and so the same props method can be called but passes a different argument depending on the function the button represents. In this case, we are adding to the database, so the argument being passed is an object containing the explicit properties of the book (from the Google API) that are necessary for the database.

NOTE: that based on the `state` of this function component (`true`/`false`), this function may be disabled so as not to allow the user to add multiple copies of the same book, more on that in a bit.

Back in 'app.js':

```js
saveToFavorites = (bookObject) => {
  API.saveBook(bookObject)
    .then(() => {
      this.getFavorites();
    })
    .catch((err) => console.error(err));
};
```

the method calls the front end API and the `saveBook` method, passing the `bookObj` to the API, which (via `axios`):

```js
  saveBook(bookData) {
    return axios.post(`/api/books`, bookData);
  },
```

calls a `POST` method on the route `/api/books` and passes the book object again to the back end router:

```js
router.route(`/`).get(booksController.findAll).post(booksController.create);
```

This router in turn references the Controller:

```js
    create: (req, res) => {
        db.Book.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
```

where the actual communication with the database occurs. Once a positive code is received and communicated via the returned `promise`, back in the front end the method `getFavorites` is called again which resets the state for the saved books.

If succesful, the user will see the number of books in the saved link parentheses increase, and the button clicked to enact this whole procedure displays an extra line of text confirming that the user added the book. Since this is a very simple part of state not relevant to the rest of the app, instead of keeping it in the state of app.js, I am using `'useState` inside of the individual book components, to toggle a boolean. That means that on refresh or if the user changes the path, this resets, and it only affects the targeted book.

### 4. Viewing Favorites and Deleting

As I mentioned previously, this is a single page application posing as multipage. Therefore, when the user clicks on 'Favorites' they are not actually viewing another page, merely rendering conditionally (dependent on the URL/route) rendered components using the `BrowserRouter` feature of React:

```js
<Router>
  <Header />
  <NavBar /* props */ />
  <Wrapper>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Home
          // props
          />
        )}
      />
      <Route
        exact
        path="/saved"
        render={() => (
          <Saved
          // props
          />
        )}
      />
    </Switch>
  </Wrapper>
</Router>
```

This enables the browser to treat it as multipage, enabling things like the ability to go 'back' and access history, as well as linking directly to a location from an external source.

The favorites page and search page, when displaying results, both look identical in the card layout - this is due to the re-usability of the React components. The difference is that the button that previously was a 'save' button, is now a delete button.

It is not necessary to go through the code because it is almost identical to the adding of a book to the database, but when `deleteFromFavorites` is called, instead of passing the book object, the ID of the book is passed, and the controller submits that ID to the database via `findById`, `then` it `remove`s that `document`.

As far as the user experience goes, since we are currently viewing a component dependent on the databse contents, an adjustment to the database followed by an update to the state causes a re-render, and the user will see the component refresh and the deleted book will have been removed.

## Setup

There is no setup, only necessary to visit the site and use.

## Features

## Status & Future Developement

This app would benefit from a user sign in - that way many users could have individual lists. As it stands, the site will display the same results to anyone, and any user can change the list. Multiple instances of the site would be required.

A personal notes section would be a good feature to have, the user could, once the book is in their list, add notes to the book, a review or a reminder, a bookmark, where to buy the book, and so on. The API is already set up for this, it would just need some front end work to implement it.

## Contact

Created by [@agtravis](https://agtravis.github.io/portfolio)
