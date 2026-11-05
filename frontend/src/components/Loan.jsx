import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Loans({onAction}) {
  const [loans, setLoans] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [message, setMessage] = useState("");

  function fetchOverdue(){
    fetch(`${API_URL}/loans/overdue`)
    .then((res) => res.json())
    .then((data) => {
        if (data.detail) {
            setMessage(data.detail);
        }else {
            setLoans(data);
            setMessage("");
        }
    });
    }

  function renewLoan(loanId) {
    fetch(`${API_URL}/loans/${loanId}/renew`, { method: "PATCH" })
    .then((res) => res.json())
    .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Loan renewed successfully!");
          onAction();
        }
    });
    }

  function returnLoan(loanId) {
    fetch(`${API_URL}/loans/${loanId}/return`, { method: "PATCH" })
    .then((res) => res.json())
    .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Book returned successfully!");
          onAction();
        }
    });
    }

    return (
    <div>
      <h3>Manage Loans</h3>
      
      <div style={{ color: "blue", fontWeight: "bold", marginBottom: "15px" }}>
        {message}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Search: </strong>
        <input placeholder="Student Roll No" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
        <button onClick={fetchStudentLoans}>Search Student</button>
        <button onClick={fetchOverdue} style={{ marginLeft: "20px" }}>View All Overdue</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {loans.map((loan) => (
          <li key={loan.id} style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
            Book ID: {loan.book_id} | Student: {loan.roll_no} <br/>
            Due On: {loan.due_on} | Renewed: {loan.renewed ? "Yes" : "No"} <br/><br/>
            <button onClick={() => renewLoan(loan.id)}>Renew</button>
            <button onClick={() => returnLoan(loan.id)} style={{ marginLeft: "5px" }}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Loans;