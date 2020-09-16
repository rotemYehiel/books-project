import bookService from '@/services/book.service.js';

export default {
    state: {
        books: [],
        filterBy: {
            name: '',
        },
        currBook: null,
    },
    getters: {
        books(state) {
            return state.books;
        },
        tags(state) {
            return state.tags;
        },
        currBook(state) {
            return state.currBook;
        },
        filterBy(state) {
            return state.filterBy;
        },
    },
    mutations: {
        setBooks(state, { books }) {
            state.books = books;
        },
        setBook(state, { book }) {
            console.log('book in setBook:', book)
            state.currBook = book;
        },
        // unsetBook(state) {
        //     state.currBook = null;
        // },
        // setFilterBy(state, { filterBy }) {
        //     state.filterBy = filterBy;
        // },
        addBook(state, { book }) {
            state.books.unshift(book);
        },
        removeBook(state, { bookId }) {
            const idx = state.books.findIndex(book => book.id === bookId);
            if (idx === -1) return;
            state.books.splice(idx, 1);
        },
        updateBook(state, { book }) {
            const idx = state.books.findIndex(currBook => currBook.id === book.id);
            if (idx === -1) return;
            state.books.splice(idx, 1, book);
        },

    },
    actions: {
        async loadBooks(context) {
            // console.log(context.getters.filterBy)
            const books = await bookService.query(context.getters.filterBy);
            // console.log('books in store:', books)
            context.commit({ type: 'setBooks', books });
            return books;
        },
        async loadBook(context, { bookId }) {
            console.log('bookId in stor:', bookId)
            const book = (bookId) ? await bookService.getById(bookId) : bookService.getEmptyBook();
            context.commit({ type: 'setBook', book });
            // console.log('book in store:', book)
            return book;
        },
        //     setFilterBy(context, payload) {
        //         context.commit(payload);
        //         return context.dispatch({ type: 'loadStations' });
        //     },
        async saveBook(context, { book }) {
            console.log(book)
            const isUpdate = !!book._id;
            book = await bookService.save(book);
            if (isUpdate) context.commit({ type: 'updateBook', book });
            else context.commit({ type: 'addBook', book });
            return book;
        },
        async removeBook(context, { bookId }) {
            await bookService.remove(bookId);
            context.commit({ type: 'removeBook', bookId });
        },

    }
}