import { useState } from "react";
import Library from "./components/Library";
import AddBook from "./components/Addbook";
import Loans from "./components/Loan";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  function handleAction() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>Library Management System</h2>
      
      <Library refresh={refresh} onAction={handleAction} />

      <AddBook onAction={handleAction} />

      <Loans refresh={refresh} onAction={handleAction} />
    </div>
  );
}
