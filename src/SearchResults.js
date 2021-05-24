import React, { Component } from 'react'
import BookList from './BookList'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class SearchResults extends Component {


      state = {
          query: '',
          searchBooks: [],
          foundResult: false
      }

       updateQuery = (query) => {
        this.setState(() => ({
          query: query.trim()
        }))
      }
      getSearchResults(query) {
        this.updateQuery(query);
        if (query.length > 0 && query !== "") {
    BooksAPI.search(query).then(searchBooks => {
        if (searchBooks.error) {
            this.setState(() => ({
                searchBooks: [],
                foundResult: false
              }
              ))
        } else 
      this.setState(() => ({
        searchBooks: searchBooks,
        foundResult: true

      }
      ))

    })
        } else {
            this.setState(() => ({
                searchBooks: [],
                foundResult: false
              }
              ))
        }
      }



      render() {
        const { updateShelf } = this.props; 
        return (<div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
        
          <div className="search-books-input-wrapper">
            <input onChange={e => this.getSearchResults(e.target.value)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
        
            {this.state.foundResult && (
            <div>
                {
        this.state.searchBooks.map(book => (
          <BookList updateShelf={updateShelf} key={book.id} bookId={book.id} /> 
        ) )
      }
            </div>)
        
            }
          </ol>
        </div>
        </div>

        )

      }
}

export default SearchResults