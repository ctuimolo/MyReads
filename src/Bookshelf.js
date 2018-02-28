import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class Bookshelf extends Component {

    static propTypes = {
        bookshelfTitle: PropTypes.string.isRequired,
        booksArray: PropTypes.array.isRequired,
        findBookshelf: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
                <div className="bookshelf-books">

                    <ListBooks
                        booksArray={this.props.booksArray}
                        findBookshelf={this.props.findBookshelf}
                        updateBook={this.props.updateBook}
                    />

                </div>
            </div>
        )
    }
}

export default Bookshelf