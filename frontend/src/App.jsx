import { useState } from "react";
<<<<<<< Updated upstream
import Books from "./Books";
import AddBook from "./AddBook";
import Loans from "./Loans";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  function handleAction() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Library Management System</h2>
      
      <Books refresh={refresh} onAction={handleAction} />
=======
import AlertButton from "./components/Library";

const API_URL = "http://127.0.0.1:8001";



function App() {
  return (
    <div>
      <AlertButton />
    </div>
  );
}
>>>>>>> Stashed changes

      <hr style={{ margin: "40px 0", borderTop: "2px solid #ccc" }} />

      <AddBook onAction={handleAction} />

      <hr style={{ margin: "40px 0", borderTop: "2px solid #ccc" }} />

      <Loans refresh={refresh} onAction={handleAction} />
    </div>
  );
}