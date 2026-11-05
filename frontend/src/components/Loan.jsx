import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Loans({onAction}) {
  const [loans, setLoans] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [message, setMessage] = useState("");


  function fetchStudentLoans() {
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
      
      <p><b>{message}</b></p>

      <b>Search: </b>
      <input placeholder="Student Roll No" value={rollNo} onChange={(e) => setRollNo(e.target.value)} />
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