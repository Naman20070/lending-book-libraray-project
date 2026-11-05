import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [message, setMessage] = useState("");
  const [bookId, setBookId] = useState("");

  function fetchOverdue() {
    fetch(`${API_URL}/loans/overdue`)
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage(data.detail);
        } else {
          setLoans(data);
          setMessage("");
        }
      });
  }

  function renewLoan(loanId) {
    fetch(`${API_URL}/loans/${loanId}/renew`, { method: "patch" })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Loan renewed successfully!");
        }
      });
  }

  function returnLoan(loanId) {
    fetch(`${API_URL}/loans/${loanId}/return`, { method: "patch" })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book returned successfully!");
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
      <h2>Borrow Book</h2>

      <label>Book ID: </label>
      <input
        type="number"
        value={bookId}
        onChange={(output) => setBookId(output.target.value)}
      />

      <label>Roll No: </label>
      <input
        type="text"
        value={rollNo}
        onChange={(output) => setRollNo(output.target.value)}
      />

      <button onClick={borrowBook}>Borrow Book</button>

      <p>{message}</p>
    </div>
  );
}

export default Loans;
