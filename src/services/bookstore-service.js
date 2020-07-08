export default class BookstoreService {
     data = [
        {   id: 1,
            title: "Harry Potter and the Sorcerer's Stone, Book 1",
            author: 'J.K. Rowling',
            price: 24,
            coverImage: "https://m.media-amazon.com/images/I/51U4p-ir2BL.jpg"
        },
        {
            id: 2,
            title: "The Hobbit (Dramatised)",
            author: "J. R. R. Tolkien",
            price: 22,
            coverImage: "https://m.media-amazon.com/images/I/51QzuC-BaML.jpg"
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout( () => {
                if(Math.random() > .75) {
                    reject( new Error('Something happened') )
                }else {
                    resolve(this.data)
                }
            }, 700 )
        })
    }
}