const books = require('../../data/book.json');


module.exports = {
    query,
    getById,
    add,
    update,
    remove,
}

async function query(params = {}) {
    // const filterBy = _buildFilterCriteria(params);
    // const sortBy = _buildSortCriteria(params);
    // const collection = await dbService.getCollection('book');
    try {
        // const books = await collection.find(filterBy).collation({ locale: "en" }).sort(sortBy).toArray();
        return books;
    } catch (err) {
        console.log('ERROR: cannot find books');
        throw err;
    }
}

async function getById(bookId) {
    // console.log('bookid in service:', bookId)
    try {
        const book = await books.find(book => {
            return book.id === bookId
        });
        return book;
    } catch (err) {
        console.log(`ERROR: while finding book ${bookId}`);
        throw err;
    }
}

async function add(book) {
    book.id = _makeId();
    try {
        await books.unshift(book);
        return book;
    } catch (err) {
        console.log(`ERROR: cannot insert book`);
        throw err;
    }
}

async function update(bookToUpdate) {
    try {
        const idx = await books.findIndex(book => {
            return book.id = bookToUpdate.id
        });
        books[idx] = bookToUpdate;
        return bookToUpdate;
    } catch (err) {
        console.log(`ERROR: cannot update book ${book.id}`);
        throw err;
    }
}

async function remove(bookId) {
    try {
        const idx = await books.findIndex(book => {
            return book.id = bookId
        });
        books.splice(idx, 1)
    } catch (err) {
        console.log(`ERROR: cannot remove book ${bookId}`);
        throw err;
    }
}

function _buildFilterCriteria(params) {
    const filterBy = {};
    if (params.name) {
        var regex = new RegExp(params.name, 'i');
        filterBy.name = { $regex: regex };
    }
    if (params.createdBy) {

    }
    if (params.type) {
        filterBy.type = params.type;
    }
    if (params.tag) {
        filterBy.tags = params.tag;
    }
    return filterBy;
}

function _buildSortCriteria(params) {
    const sortBy = { name: 1 };
    // const sortBy = {};
    // sortBy[params._sort] = +params._order;
    return sortBy;
}

function _makeId(length = 11) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}