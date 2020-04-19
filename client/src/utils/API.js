import axios from 'axios';

export default {
    // Gets all books
    getBooks() {
        return axios.get(`/api/books`);
    },
    // Gets the book with the given id
    getBook(id) {
        return axios.get(`/api/books/${ id}`);
    },
    // Deletes the book with the given id
    deleteBook(id) {
        return axios.delete(`/api/books/${ id}`);
    },
    // Saves a book to the database
    saveBook(bookData) {
        return axios.post(`/api/books`, bookData);
    }
};
