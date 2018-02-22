import React, { Component } from 'react'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'



class BooksApp extends Component {
    state = {
        allBooks: [],

        currentlyReading: [],
        wantToRead: [],
        read: [],

        searchResults: []
    }

    updateQuery(query) {
        BooksAPI.search(query).then((APIsearchResults) => {
            if (query !== '' && APIsearchResults.error !== "empty query") {
                this.setState({ searchResults: APIsearchResults })
            }
            else
                this.setState({ searchResults: [] })
        })
    }

    sortShelves() {
        BooksAPI.getAll().then((allBooks) => {

            this.setState({
                allBooks:         allBooks,
                currentlyReading: allBooks.filter((book) => book.shelf === 'currentlyReading'),
                wantToRead:       allBooks.filter((book) => book.shelf === 'wantToRead'),
                read:             allBooks.filter((book) => book.shelf === 'read')
            })
        })
    }

    findBookshelf(book) {
        const matchingBook = this.state.allBooks.find((ownedBook) => {
            return (book.id === ownedBook.id)
        })
        return matchingBook !== undefined ? matchingBook.shelf : "none"
    }

    componentDidMount() {
        this.sortShelves()
    }

    render() {
        return (
            <BrowserRouter basename={process.env.REACT_APP_BASENAME || '/'}>
                <div className="app">

                    <Route path="/search" render={() => (
                        <div className="search-books">
                            <div className="search-books-bar">
                                <Link className="close-search" to="/">Close search</Link>
                                <div className="search-books-input-wrapper">

                                    <input
                                        type="text"
                                        placeholder="Search by title or author"
                                        value={this.state.query}
                                        onChange={(event) => this.updateQuery(event.target.value)}
                                    />

                                </div>
                            </div>
                            <div className="search-books-results">
                                <ol className="books-grid">

                                    {this.state.searchResults.map((book) => (
                                        <li key={book.id} className='books-item'>
                                            <div className="book">
                                                <div className="book-top">

                                                    <div className="book-cover" style={
                                                        {
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage: "url('" + ((book.imageLinks !== undefined) ? book.imageLinks.thumbnail : '' )+ + "')"
                                                        }
                                                    }/>

                                                    <div className="book-shelf-changer">
                                                        <select defaultValue={this.findBookshelf(book)}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}

                                </ol>
                            </div>
                        </div>
                    )} />

                    <Route exact path="/" render={() => (
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

                                                {this.state.currentlyReading.map((book) => (
                                                    <li key={book.id} className='books-item'>
                                                        <div className="book">
                                                            <div className="book-top">
                                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url('" + book.imageLinks.thumbnail + "')" }}></div>
                                                                <div className="book-shelf-changer">
                                                                    <select defaultValue={this.findBookshelf(book)}>
                                                                        <option value="none" disabled>Move to...</option>
                                                                        <option value="currentlyReading">Currently Reading</option>
                                                                        <option value="wantToRead">Want to Read</option>
                                                                        <option value="read">Read</option>
                                                                        <option value="none">None</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="book-title">{book.title}</div>
                                                            <div className="book-authors">{book.authors}</div>
                                                        </div>
                                                    </li>
                                                ))}

                                            </ol>
                                        </div>
                                    </div>

                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">

                                            <ol className="books-grid">
                                                <ol className="books-grid">

                                                    {this.state.wantToRead.map((book) => (
                                                        <li key={book.id} className='books-item'>
                                                            <div className="book">
                                                                <div className="book-top">
                                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url('" + book.imageLinks.thumbnail + "')" }}></div>
                                                                    <div className="book-shelf-changer">
                                                                        <select defaultValue={this.findBookshelf(book)}>
                                                                            <option value="none" disabled>Move to...</option>
                                                                            <option value="currentlyReading">Currently Reading</option>
                                                                            <option value="wantToRead">Want to Read</option>
                                                                            <option value="read">Read</option>
                                                                            <option value="none">None</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="book-title">{book.title}</div>
                                                                <div className="book-authors">{book.authors}</div>
                                                            </div>
                                                        </li>
                                                    ))}

                                                </ol>
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">
                                            <ol className="books-grid">

                                                {this.state.read.map((book) => (
                                                    <li key={book.id} className='books-item'>
                                                        <div className="book">
                                                            <div className="book-top">
                                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url('" + book.imageLinks.thumbnail + "')" }}></div>
                                                                <div className="book-shelf-changer">
                                                                    <select defaultValue={this.findBookshelf(book)}>
                                                                        <option value="none" disabled>Move to...</option>
                                                                        <option value="currentlyReading">Currently Reading</option>
                                                                        <option value="wantToRead">Want to Read</option>
                                                                        <option value="read">Read</option>
                                                                        <option value="none">None</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="book-title">{book.title}</div>
                                                            <div className="book-authors">{book.authors}</div>
                                                        </div>
                                                    </li>
                                                ))}

                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search" className="search-book">Search book</Link>
                            </div>
                        </div>

                    )} />
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
