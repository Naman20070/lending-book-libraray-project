import { useState, useEffect } from "react";

const API_URL = "http://127.0.0.1:8001";

function Books({ refresh, onAction }) {
  const [books, setBooks] = useState([]);
  const [selectedgenre, setGenre] = useState("");
  const [selectedtitle, setTitle] = useState("");
  const [bookId, setBookId] = useState("");
  const [deleteBookId, setDeleteBookId] = useState("");
  const [newTotalCopies, setNewTotalCopies] = useState("");
  const [message, setMessage] = useState("");
  const [rollNo, setRollNo] = useState("");
  

  useEffect(() => {
    fetchbooks();
  }, [refresh]);

  function fetchbooks() {
    let url = `${API_URL}/books`;

    if (selectedgenre !== "" && selectedtitle !== "") {
      url = `${API_URL}/books?genre=${selectedgenre}&title=${selectedtitle}`;
    } else if (selectedtitle !== "") {
      url = `${API_URL}/books?title=${selectedtitle}`;
    } else if (selectedgenre !== "") {
      url = `${API_URL}/books?genre=${selectedgenre}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }

  function changeTotalCopies() {
    fetch(`${API_URL}/books/copies/${bookId}?new_total_copies=${newTotalCopies}`, {
      method: "PATCH"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Total copies updated successfully!");
          setBookId("");
          setNewTotalCopies("");
          onAction();
        }
      });
  }

  function deleteBook() {
    fetch(`${API_URL}/books/${deleteBookId}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book deleted successfully!");
          setDeleteBookId("");
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
      <input placeholder="Title" value={selectedtitle} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Genre" value={selectedgenre} onChange={(e) => setGenre(e.target.value)} />
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
      Book ID: 
      <input type="text" value={bookId} onChange={(box) => setBookId(box.target.value)} />
      New Total Copies: 
      <input type="number" value={newTotalCopies} onChange={(box) => setNewTotalCopies(box.target.value)} />
      <button onClick={changeTotalCopies}>Change Copies</button>
      
      <br/><br/>

      <b>Delete Book</b><br/>
      Book ID: 
      <input type="text" value={deleteBookId} onChange={(box) => setDeleteBookId(box.target.value)} />
      <button onClick={deleteBook}>Delete Book</button>

      <br/><br/>

      <b>Borrow Book</b><br/>
      Book ID: 
      <input type="number" value={bookId} onChange={(box) => setBookId(box.target.value)} />
      Roll No: 
      <input type="text" value={rollNo} onChange={(box) => setRollNo(box.target.value)} />
      <button onClick={borrowBook}>Borrow Book</button>
      <p>{message}</p>
      </div>
      

);
}

export default Books;