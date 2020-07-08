import React, {Component} from "react";
import { bindActionCreators } from "redux";
import BookListItem from "../book-list-item";
import {fetchBooks, bookAddedToCart} from '../../actions/index'
import {connect} from 'react-redux';
import {withBookstoreService} from "../hoc/index";
import compose from "../../utils";

import './book-list.css'
import Spinner from '../spinner'
import ErrorIndicator from "../error-indicator";

const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className={'book-list'}>
            {
                books.map( (book) => {
                    return(
                        <li key={book.id}>
                            <BookListItem book={book}
                                          onAddedToCart={ () => onAddedToCart(book.id) }/>
                        </li>
                    )
                } )
            }
        </ul>
        )
}

class BookListContainer extends Component {

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const {books, loading, error, onAddedToCart} = this.props;
        if(loading) {
            return <Spinner/>
        }
        if(error) {
            return <ErrorIndicator/>
        }
        return <BookList books={books} onAddedToCart={onAddedToCart} />
    }
};

const mapStateToProps = ( { bookList: {books, loading, error}} ) => {
    return {
        books,
        loading,
        error
    };
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch)
}

// export default withBookstoreService()( connect( mapStateToProps, {booksLoaded} )( BookList ) );
export default compose( withBookstoreService(),
    connect( mapStateToProps, mapDispatchToProps )) (BookListContainer)