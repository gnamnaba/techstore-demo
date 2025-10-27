import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 'user' or 'admin'

  // Detect Firefox only
  const isFirefox = typeof InstallTrigger !== "undefined";
  if (!isFirefox) {
    return (
      <div className="firefox-only">
        <h2>⚠️ Firefox Required</h2>
        <p>This application is only accessible via Firefox.</p>
      </div>
    );
  }

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      // simple role logic: "admin" username logs in as admin
      if (username.toLowerCase() === "admin") {
        setRole("admin");
      } else {
        setRole("user");
      }
      setIsLoggedIn(true);
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <div className="login-container">
          <h1 className="logo">🛒 TechStore Demo</h1>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="store-container">
        <div className="header">
          <div className="header-left">
            <h2>Welcome, {username}</h2>
            <p style={{ color: "#6b7280" }}>
              {role === "admin" ? "Admin Dashboard" : "Customer View"}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {role === "admin" ? (
          <div>
            <h3>📊 Sales Overview</h3>
            <p>Track your sales and monitor product performance here.</p>
            <div className="product-grid">
              <div className="product-card">
                <h4>Total Sales</h4>
                <p>KSh 120,000</p>
              </div>
              <div className="product-card">
                <h4>Orders</h4>
                <p>340</p>
              </div>
              <div className="product-card">
                <h4>Active Products</h4>
                <p>23</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3>🛍️ Available Products</h3>
            <div className="product-grid">
              <div className="product-card">
                <h4>Wireless Mouse</h4>
                <p>KSh 1,200</p>
                <button className="buy-btn">Buy</button>
              </div>
              <div className="product-card">
                <h4>Keyboard</h4>
                <p>KSh 2,500</p>
                <button className="buy-btn">Buy</button>
              </div>
              <div className="product-card">
                <h4>Headphones</h4>
                <p>KSh 3,800</p>
                <button className="buy-btn">Buy</button>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">© 2025 TechStore Demo</footer>
      </div>
    </div>
  );
}

export default App;


