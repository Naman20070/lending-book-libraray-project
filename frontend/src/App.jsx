import { useState } from "react";
import Books from "./components/Books";
import MyLoans from "./components/MyLoans";
import Librarian from "./components/Librarian";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  function handleAction() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
        <img src="/favicon.png" alt="" />
        Library Management System
      </h2>
      
      <Books refresh={refresh} onAction={handleAction} />

      <MyLoans onAction={handleAction} />

      <Librarian onAction={handleAction} />
    </div>
  );
}
