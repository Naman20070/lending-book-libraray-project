import { useState } from "react";
import Library from ".components/Library";
import AddBook from ".components/AddBook";
import Loans from ".components/Loan";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  function handleAction() {
    setRefresh((prev) => prev + 1);
  }

  return (
    <div>
      <h2>Library Management System</h2>
      
      <Library refresh={refresh} onAction={handleAction} />


      <AddBook onAction={handleAction} />


      <Loans refresh={refresh} onAction={handleAction} />
    </div>
  );
}