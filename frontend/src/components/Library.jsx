import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";

function Library() {
  const [selectedgenre, setGenre] = useState("");
  const [selectedtitle, setTitle] = useState("");
  const [selectedauthor, setAuthor] = useState("");
  const [selectedcopies, setCopies] = useState(0);
  const [selectedbooks, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [deleteBookId, setDeleteBookId] = useState("");
  const [newTotalCopies, setNewTotalCopies] = useState("");
  const [message, setMessage] = useState("");

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
      method: "patch"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Total copies updated successfully!");
        }
      });
  }

  function deleteBook() {
    fetch(`${API_URL}/books/${deleteBookId}`, {
      method: "delete"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book deleted successfully!");
        }
      });
  }

  return (
    <div>
      <h2>Change Total Copies</h2>
      <label>Book ID: </label>
      <input
        type="text"
        value={bookId}
        onChange={(output) => setBookId(output.target.value)}
      />

      <label>New Total Copies: </label>
      <input
        type="number"
        value={newTotalCopies}
        onChange={(output) => setNewTotalCopies(output.target.value)}
      />

      <button onClick={changeTotalCopies}>Change Copies</button>

      <h2>Delete Book</h2>
      <label>Book ID: </label>
      <input
        type="text"
        value={deleteBookId}
        onChange={(output) => setDeleteBookId(output.target.value)}
      />

      <button onClick={deleteBook}>Delete Book</button>

      <p>{message}</p>
    </div>
  );
}

export default Library;
