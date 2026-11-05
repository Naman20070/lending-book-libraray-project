import { useState } from "react";

const API_URL = "http://127.0.0.1:8000";

function Loans() {
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
        }
    });
    }
}