import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BookList extends Component {

      state = {
        book: '',
        img: 'https://via.placeholder.com/150',
        authors: ''
      }

componentDidMount() {
    this.getBookById(this.props.bookId);
}

getBookById(bookId) {
BooksAPI.get(bookId).then((book) => {
const img = book?.imageLinks?.smallThumbnail ?? 'https://via.placeholder.com/150';
const authors = book.authors ? book.authors.join(', ') : '';

    this.setState(() => ({
book,
img,
authors
}))
})
      }
      

      render() {
        const { updateShelf } = this.props;

        
        return (
                  <li key={this.state.book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.state.img})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={this.state.book.shelf}
                          onChange={(e) => updateShelf(this.state.book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{this.state.book.title}</div>
                      <div className="book-authors">{this.state.authors}</div>
                    </div>
                  </li>)

      }
}

export default BookList