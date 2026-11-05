import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";

function Librarian({ onAction }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
  const [bookId, setBookId] = useState("");
  const [deleteBookId, setDeleteBookId] = useState("");
  const [newTotalCopies, setNewTotalCopies] = useState("");
  const [overdueLoans, setOverdueLoans] = useState([]);
  const [message, setMessage] = useState("");

  function handleAddBook() {
    if (!title || !author || !genre || !totalCopies) {
      setMessage("Please fill in all fields.");
      return;
    }

    const url = `${API_URL}/books?title=${title}&author=${author}&genre=${genre}&total_copies=${totalCopies}&copies_available=${totalCopies}`;

    fetch(url, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book added successfully!");
          setTitle("");
          setAuthor("");
          setGenre("");
          setTotalCopies("");
          onAction(); 
        }
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

  function fetchOverdue() {
    fetch(`${API_URL}/loans/overdue`)
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage(data.detail);
        } else {
          setOverdueLoans(data);
          setMessage("");
        }
      });
  }

  return (
    <div>
      <h3>Librarian</h3>

      <p><b>{message}</b></p>

      <b>Add a New Book</b><br/>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /> <br/><br/>
      <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} /> <br/><br/>
      Genre: <b>{genre ? genre : "None"}</b> <br/>
      <div style={{ margin: "6px 0 10px" }}>
        <button type="button" onClick={() => setGenre("textbook")}>textbook</button>
        <button type="button" onClick={() => setGenre("fiction")}>fiction</button>
        <button type="button" onClick={() => setGenre("reference")}>reference</button>
        <button type="button" onClick={() => setGenre("magazine")}>magazine</button>
        <button type="button" onClick={() => setGenre("biography")}>biography</button>
      </div>
      <input type="number" placeholder="Total Copies" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} /> <br/><br/>
      <button onClick={handleAddBook}>Submit Book</button>

      <br/><br/>

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

      <b>Overdue Loans</b><br/>
      <button onClick={fetchOverdue}>View All Overdue</button>
      
      <br/><br/>

      <ul>
        {overdueLoans.map((loan) => (
          <li key={loan.id}>
            Book ID: {loan.book_id} | Student: {loan.roll_no} <br/>
            Due On: {loan.due_on} | Renewed: {loan.renewed ? "Yes" : "No"} <br/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Librarian;
