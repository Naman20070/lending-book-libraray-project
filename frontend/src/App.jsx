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
    <div>
      <h2>Library Management System</h2>
      
      <Books refresh={refresh} onAction={handleAction} />

      <MyLoans onAction={handleAction} />

      <Librarian onAction={handleAction} />
    </div>
  );
}
