function App() {
  // ... your state & handleAction logic ...

  return (
    <div>
      {/* ... your other components (e.g. Header, Library) ... */}

      <hr style={{ margin: "40px 0", borderTop: "2px solid #ccc" }} />
      <AddBook onAction={handleAction} />
      
      <hr style={{ margin: "40px 0", borderTop: "2px solid #ccc" }} />
      <Loans refresh={refresh} onAction={handleAction} />
    </div>
  );
}

export default App;