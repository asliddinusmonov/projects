const updateOrder = (bookId, state, quantity) => {
    const { bookList: {books}, shoppingCart: {cartItems} } = state;
    const book = books.find( (book) => book.id === bookId );
    const itemIndex = cartItems.findIndex( ({id}) => id === bookId );
    const item = cartItems[itemIndex];
    const newItem = updateCartItem(book, item, quantity);

    return {
        orderTotal: updateOrderTotal(state.shoppingCart.orderTotal, newItem.price, quantity),
        totalCount: updateTotalCount(state.shoppingCart.totalCount, quantity),
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    }
}

const updateOrderTotal = (total, price, quantity) => {
    return total + quantity*price;
};
const updateTotalCount = (count, quantity) => {
    return count + quantity;
}

const updateCartItems = (cartItems, item, idx) => {
    if( item.count === 0 ) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

    if (idx === -1) {
        return [
            ...cartItems,
            item
        ];
    }

    return [
        ...cartItems.slice(0, idx),
        item,
        ...cartItems.slice(idx + 1)
    ]
};

const updateCartItem = ( book, item = {}, quantity ) => {
    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0
    } = item;
    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity*book.price,
        price: book.price
    }
};

const updateShoppingCart = ( state, action ) => {
    if(state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
            totalCount: 0
        }
    }
    switch (action.type) {
        case 'BOOK_ADDED_TO_CART' :
            return updateOrder(action.payload, state, 1);

        case 'BOOK_REMOVED_FROM_CART' :
            const item = state.shoppingCart.cartItems.find( ({id}) => id === action.payload );
            return updateOrder(action.payload, state, -item.count);


        case 'BOOK_MINUS_FROM_CART' :
            return updateOrder(action.payload, state, -1);
        default :
            return state.shoppingCart;
    }
};

export default updateShoppingCart;