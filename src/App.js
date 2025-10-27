import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // detect if browser is Firefox
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

  const products = [
    { id: 1, name: "Laptop", price: 120000 },
    { id: 2, name: "Mouse", price: 2500 },
    { id: 3, name: "Keyboard", price: 7000 },
  ];

  const handleLogin = () => {
    if (username.trim() !== "") {
      setLoggedIn(true);
    }
  };

  if (!isFirefox) {
    return (
      <div className="firefox-only">
        <h2>⚠️ Firefox Only</h2>
        <p>This TechStore demo works best in Mozilla Firefox.</p>
      </div>
    );
  }

  return (
    <div className="app">
      {!loggedIn ? (
        <div className="login-container">
          <ShoppingBag className="logo" size={40} />
          <h2>Welcome to TechStore</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <button onClick={handleLogin} className="btn">
            Continue
          </button>
        </div>
      ) : (
        <div className="store-container">
          <header className="header">
            <div className="header-left">
              <ShoppingBag size={28} />
              <h1>TechStore</h1>
            </div>
            <button onClick={() => setLoggedIn(false)} className="logout-btn">
              Logout
            </button>
          </header>

          <main>
            <h2>Hello, {username}</h2>
            <p>Check out our available products:</p>
            <div className="product-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>KES {product.price.toLocaleString()}</p>
                  <button className="buy-btn">Add to Cart</button>
                </div>
              ))}
            </div>
          </main>

          <footer className="footer">
            <p>© {new Date().getFullYear()} TechStore Demo</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
