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
    <div>
      <h2>Library Management System</h2>
      
      <Library refresh={refresh} onAction={handleAction} />

<<<<<<< HEAD
      <AddBook onAction={handleAction} />

=======

      <AddBook onAction={handleAction} />


>>>>>>> 6861848321f75efe15875f758403468a126ca6fb
      <Loans refresh={refresh} onAction={handleAction} />
    </div>
  );
}
