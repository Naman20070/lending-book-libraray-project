import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function Books({ refresh, onAction }) {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [rollNo, setRollNo] = useState("");
  

  useEffect(() => {
    fetchbooks();
  }, [refresh]);

  function fetchbooks() {
    const title = document.getElementById("searchTitle").value;
    const genre = document.getElementById("searchGenre").value;

    let url = `${API_URL}/books`;

    if (genre !== "" && title !== "") {
      url = `${API_URL}/books?genre=${genre}&title=${title}`;
    } else if (title !== "") {
      url = `${API_URL}/books?title=${title}`;
    } else if (genre !== "") {
      url = `${API_URL}/books?genre=${genre}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }

  function changeTotalCopies() {
    const bookId = document.getElementById("updateBookId").value;
    const newTotalCopies = document.getElementById("updateCopies").value;

    fetch(`${API_URL}/books/copies/${bookId}?new_total_copies=${newTotalCopies}`, {
      method: "PATCH"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Total copies updated successfully!");
          document.getElementById("updateBookId").value = "";
          document.getElementById("updateCopies").value = "";
          onAction();
        }
      });
  }

  function deleteBook() {
    const deleteBookId = document.getElementById("deleteBookId").value;

    fetch(`${API_URL}/books/${deleteBookId}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book deleted successfully!");
          document.getElementById("deleteBookId").value = "";
          onAction();
        }
      });
  }

  function borrowBook() {
    fetch(`${API_URL}/books/borrow/${bookId}?roll_no=${rollNo}`, {
      method: "post"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book borrowed successfully!");
        }
      });
  }

  return (
    <div>
      <h3>Library Inventory</h3>
      
      <p><b>{message}</b></p>

      <b>Search Books: </b>
      <input id="searchTitle" placeholder="Title" />
      <input id="searchGenre" placeholder="Genre" />
      <button onClick={fetchbooks}>Search</button>

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            ID: {book.id} | Title: {book.title} | Genre: {book.genre} <br/>
            Available: {book.copies_available} / {book.total_copies} <br/><br/>
          </li>
        ))}
      </ul>

      <br/>

      <b>Change Total Copies</b><br/>
      <input id="updateBookId" placeholder="Book ID" />
      <input id="updateCopies" type="number" placeholder="New Total Copies" />
      <button onClick={changeTotalCopies}>Change Copies</button>
      
      <br/><br/>

      <b>Delete Book</b><br/>
      <input id="deleteBookId" placeholder="Book ID to Delete" />
      <button onClick={deleteBook}>Delete Book</button>
    </div>
  );
}
