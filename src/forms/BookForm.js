import React from "react";
import bookStore from "../stores/bookStore";

import { observer } from "mobx-react";

class BookForm extends React.Component {
    state = {
      title: "",
      color: "",
    };
  
    submitBook = async event => {
      event.preventDefault();
      await bookStore.addBook(this.state, this.props.author);
      if (!bookStore.errors) {
        this.props.closeModal();
      }
    };
  
    textChangeHandler = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  
    render() {
      return (
        <div className="mt-5 p-2">
          <form onSubmit={this.submitBook}>
            {bookStore.errors && (
              <div className="alert alert-danger" role="alert">
                {bookStore.errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Title</span>
              </div>
              <input onChange={this.textChangeHandler} type="text" className="form-control" name="title" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Color</span>
              </div>
              <select onChange={this.textChangeHandler} type="text" className="form-control" name="color" >
                  <option value="yellow">Yellow</option>
                  <option value="blue">Blue</option>
              </select>
            </div>

            <input type="submit" />
          </form>
        </div>
      );
    }
  }
  
  export default observer(BookForm);
  