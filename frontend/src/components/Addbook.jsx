import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

export default function AddBook({ onAction }) {
  const [message, setMessage] = useState("");

  function handleAddBook() {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const genre = document.getElementById("genreInput").value;
    const totalCopies = document.getElementById("copiesInput").value;

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
          
          document.getElementById("titleInput").value = "";
          document.getElementById("authorInput").value = "";
          document.getElementById("genreInput").value = "";
          document.getElementById("copiesInput").value = "";
          
          onAction(); 
        }
      });
  }

  return (
    <div>
      <h3>Add a New Book</h3>
      
      <p><b>{message}</b></p>

      <input id="titleInput" placeholder="Title" /> <br/><br/>
      <input id="authorInput" placeholder="Author" /> <br/><br/>
      
      <select id="genreInput">
        <option value="">Select a Genre</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Mystery">Mystery</option>
      </select> <br/><br/>

      <input id="copiesInput" type="number" placeholder="Total Copies" /> <br/><br/>
      
      <button onClick={handleAddBook}>Submit Book</button>
    </div>
  );
}