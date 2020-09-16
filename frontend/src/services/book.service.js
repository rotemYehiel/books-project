import axios from 'axios';

const baseUrl = (process.env.NODE_ENV !== 'development') ?
    '/api/books' :
    '//localhost:5000/api/books';

export default {
    query,
    getById,
    getEmptyBook,
    remove,
    save,
    // getEmptyFilter
};

function query() {
    // return axios.get(`${baseUrl}`, { params: filterBy })
    return axios.get(`${baseUrl}`)
        .then(res => {
            return res.data
        })
}

function getById(bookId) {
    // console.log('bookId in service:', bookId)
    return axios.get(`${baseUrl}/${bookId}`)
        .then(res => {
            // console.log('res.data:', res.data)
            return res.data
        })
}

function getEmptyBook() {
    return {
        // id: _makeId(),
        title: '',
        subtitle: '',
        authors: [],
        publishedDate: '',
        description: '',
        pageCount: 0,
        categories: [],
        thumbnail: '',
        language: '',
        listPrice: {
            amount: 0,
            currencyCode: "EUR",
            isOnSale: false
        }

    }
}
// function getEmptyFilter() {
//     return {

//         name: '',
//         tag: '',
//         createdBy: '',
//         _sort: 'name',
//         _order: 1
//     }

// }


function remove(bookId) {
    return axios.delete(`${baseUrl}/${bookId}`);
}

function save(book) {
    return (book.id) ?
        axios.put(`${baseUrl}/${book.id}`, book) :
        axios.post(`${baseUrl}`, book);
}



// function _createBooks() {
//     return baseUrl
//     // books = require('../../../backend/data/book.json')
//     // if (books && books.length) return books;
//     // return ['Do the Stuff', 'Eat the Lunch'].map(_createBook)
// }

// function _createBook(txt, importance, color, category) {
//     return {
//         id: _makeId(),
//         txt,
//         isDone: false,
//         importance: +importance,
//         color,
//         category

//     }
// }

// function _makeId(length = 3) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }