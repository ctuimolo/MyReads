import React, { Component } from 'react'

class ListBooks extends Component {

    updateSelect = (book, event) => {
        this.props.updateBook(book, event.target.value)
    }

	render() {
		return (

			<ol className="books-grid">

				{this.props.booksArray.map((book) => (
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
                                    <select defaultValue={this.props.findBookshelf(book)} onChange={(event) => this.updateSelect(book, event)}>
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

		)
	}
}

export default ListBooks