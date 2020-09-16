const bookService = require('./book.service')

module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(req, res) {
    const books = await bookService.query(req.query)
    res.json(books)
}

async function getById(req, res) {
    const book = await bookService.getById(req.params.id)
    res.json(book)
}

async function add(req, res) {
    console.log('add book:', req.body)
    const book = req.body;
    await bookService.add(book)
    res.json(book)
}

async function update(req, res) {
    console.log('update book:', req.body)
    const book = req.body;
    await bookService.update(book)
    res.json(book)
}

async function remove(req, res) {
    await bookService.remove(req.params.id)
    res.end()
}