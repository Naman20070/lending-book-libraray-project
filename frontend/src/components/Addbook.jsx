import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function AddBook({ onAction }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [totalCopies, setTotalCopies] = useState("");
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

  return (
    <div>
      <h3>Add a New Book</h3>
      
      <div style={{ color: "blue", fontWeight: "bold", marginBottom: "15px" }}>
        {message}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", marginBottom: "20px" }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input type="number" placeholder="Total Copies" value={totalCopies} onChange={(e) => setTotalCopies(e.target.value)} />
        
        <button onClick={handleAddBook}>Submit Book</button>
      </div>
    </div>
  );
}

export default AddBook