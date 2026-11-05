import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Loans({ onAction }) {
  const [loans, setLoans] = useState([]);
  const [message, setMessage] = useState("");

  function fetchStudentLoans() {
    const rollNo = document.getElementById("searchRollNo").value;
    
    if (!rollNo) {
      setMessage("Enter a Roll No to search.");
      return;
    }
    
    fetch(`${API_URL}/loans/student/${rollNo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) setMessage(data.detail);
        else {
          setLoans(data);
          setMessage(""); 
        }
      });
  }

  function fetchOverdue() {
    document.getElementById("searchRollNo").value = "";
    
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
    fetch(`${API_URL}/loans/${loanId}/renew`, { method: "PATCH" })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Error: " + data.detail);
        } else {
          setMessage("Loan renewed successfully!");
          
          const rollNo = document.getElementById("searchRollNo").value;
          if (rollNo === "") {
            fetchOverdue();
          } else {
            fetchStudentLoans();
          }
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
          
          const rollNo = document.getElementById("searchRollNo").value;
          if (rollNo === "") {
            fetchOverdue();
          } else {
            fetchStudentLoans();
          }
          onAction();
        }
      });
  }

  return (
    <div>
      <h3>Manage Loans</h3>
      
      <p><b>{message}</b></p>

      <b>Search: </b>
      <input id="searchRollNo" placeholder="Student Roll No" />
      <button onClick={fetchStudentLoans}>Search Student</button>
      <button onClick={fetchOverdue}>View All Overdue</button>
      
      <br/><br/>

      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            Book ID: {loan.book_id} | Student: {loan.roll_no} <br/>
            Due On: {loan.due_on} | Renewed: {loan.renewed ? "Yes" : "No"} <br/>
            
            <button onClick={() => renewLoan(loan.id)}>Renew</button>
            <button onClick={() => returnLoan(loan.id)}>Return</button>
            
            <br/><br/>
          </li>
        ))}
      </ul>
    </div>

  );
}

export default Loans;