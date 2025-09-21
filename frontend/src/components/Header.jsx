import React from "react";

function Header() {
  return (
    <header style={{ background: "#002B5B", padding: "10px", color: "white" }}>
      <h1>Opinion Poll</h1>
      <nav>
        <a href="/" style={{ margin: "0 10px", color: "white" }}>Vote</a>
        <a href="/results" style={{ margin: "0 10px", color: "white" }}>Results</a>
      </nav>
    </header>
  );
}

export default Header;
