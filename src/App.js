import React from "react";
import BookList from "./BookList";
import { Link } from "react-router-dom";
import SearchResults from "./SearchResults";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  bookByShelf(shelf) {
    return this.state.books.filter((book) => book.shelf === shelf);
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  componentDidMount() {
    this.getAllBooks();
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => this.getAllBooks());
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.bookByShelf("currentlyReading").map(
                          (book) => (
                            (
                              <BookList
                                updateShelf={this.updateShelf}
                                key={book.id}
                                bookId={book.id}
                              />
                            )
                          )
                        )}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.bookByShelf("wantToRead").map(
                          (book) => (
                            (
                              <BookList
                                updateShelf={this.updateShelf}
                                key={book.id}
                                bookId={book.id}
                              />
                            )
                          )
                        )}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.bookByShelf("read").map(
                          (book) => (
                            (
                              <BookList
                                updateShelf={this.updateShelf}
                                key={book.id}
                                bookId={book.id}
                              />
                            )
                          )
                        )}{" "}
                      </ol>
                    </div>
                  </div>
                </div>
                <Link className="open-search" to="/search">
                  <button>Add book</button>
                </Link>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => <SearchResults updateShelf={this.updateShelf} />}
        />
      </div>
    );
  }
}

export default BooksApp;
