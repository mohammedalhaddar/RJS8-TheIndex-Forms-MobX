import { decorate, observable, computed } from "mobx";
import axios from "axios";
import authorStore from "./authorStore";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/api/"
});

instance.defaults.headers.common.Authorization =
"JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODcsInVzZXJuYW1lIjoidGVzdGluZ2czIiwiZXhwIjoxNTc5MTA2NTU0LCJlbWFpbCI6InRlc3QxQGluZ2cuY29tIn0.p2fmwmyc5xalKjvo4blbk-GZ4bZlnqt9c0H93tT8tWU"


function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}

class BookStore {
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  addBook = async (state, author) => {
    try {
      const res = await instance.post("books/", {
        title: state.title,
        color: state.color,
        authors: [author.id]
      });
      const book = res.data;
      
      this.books.push(book);
      let currentAuthor = authorStore.getAuthorById(author.id);
      currentAuthor.books.push(book.id);
      this.errors = null;
    } catch (err) {
      console.log(err)
      this.errors = errToArray(err.response.data);
    }
  }

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
