import React from "react";

// Components
import BookTable from "./BookTable";
import AddBookModal from "./AddBookModal";

// Stores
import authorStore from "./stores/authorStore";
import bookStore from "./stores/bookStore";


import {observer} from "mobx-react";
const AuthorDetail = props => {
  const authorID = props.match.params.authorID;
  const author = authorStore.getAuthorById(authorID);
  const authorName = `${author.first_name} ${author.last_name}`;

  const books = author.books.map(bookID => bookStore.getBookById(bookID));

  return (
    <div>
      <AddBookModal author={author}/>
      <div>
        <h3>{authorName}</h3>
        <img
          src={author.imageUrl}
          className="img-thumbnail img-fluid"
          alt={authorName}
        />
      </div>
      <BookTable books={books} />
    </div>
  );
};

export default observer(AuthorDetail);
