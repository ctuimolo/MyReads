import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ListBooks from './ListBooks'
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

    sortShelves = () => {
        BooksAPI.getAll().then((allBooks) => {

            this.setState({
                allBooks:         allBooks,
                currentlyReading: allBooks.filter((book) => book.shelf === 'currentlyReading'),
                wantToRead:       allBooks.filter((book) => book.shelf === 'wantToRead'),
                read:             allBooks.filter((book) => book.shelf === 'read')
            })
        })
    }

    findBookshelf = (book) => {
        const matchingBook = this.state.allBooks.find((ownedBook) => {
            return (book.id === ownedBook.id)
        })
        return matchingBook !== undefined ? matchingBook.shelf : "none"
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(this.sortShelves)
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
                                <Link className="close-search" to="/" onClick={() => this.setState({searchResults:[]})}>Close search</Link>
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
                                <ListBooks
                                    booksArray={this.state.searchResults}
                                    findBookshelf={this.findBookshelf}
                                    updateBook={this.updateBook}
                                />
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

                                            <ListBooks
                                                booksArray={this.state.currentlyReading}
                                                findBookshelf={this.findBookshelf}
                                                updateBook={this.updateBook}
                                            />

                                        </div>
                                    </div>

                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Want to Read</h2>
                                        <div className="bookshelf-books">

                                            <ListBooks
                                                booksArray={this.state.wantToRead}
                                                findBookshelf={this.findBookshelf}
                                                updateBook={this.updateBook}
                                            />

                                        </div>
                                    </div>

                                    <div className="bookshelf">
                                        <h2 className="bookshelf-title">Read</h2>
                                        <div className="bookshelf-books">

                                            <ListBooks
                                                booksArray={this.state.read}
                                                findBookshelf={this.findBookshelf}
                                                updateBook={this.updateBook}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="open-search">
                                <Link to="/search" className="search-book" onClick={() => this.setState({ searchResults: [] })}>Search book</Link>
                            </div>
                        </div>

                    )} />
                </div>
            </BrowserRouter>
        )
    }
}

export default BooksApp
