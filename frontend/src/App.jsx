import { useState } from "react";

const API_URL = "http://127.0.0.1:8001";



function App() {
  const [refresh, setRefresh] = useState(0);

  function handleAction() {
    setRefresh((prev) => prev + 1);
  }

  return (
    pass
  );
}

export default App;
