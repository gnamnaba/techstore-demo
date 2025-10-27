import './App.css';
import React, { useState } from 'react';
function Card({ children, className }) {
  return <div className={`rounded-xl shadow-lg bg-white p-4 ${className}`}>{children}</div>;
}
function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
function Button({ children, onClick, className, size = 'md' }) {
  const padding = size === 'sm' ? 'px-2 py-1 text-sm' : 'px-4 py-2';
  return (
    <button
      onClick={onClick}
      className={`rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium ${padding} ${className}`}
    >
      {children}
    </button>
  );
}
function Input({ type = 'text', placeholder, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={`w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}

import { motion } from "framer-motion";
import { ShoppingBag, BarChart3, LogIn, User } from "lucide-react";

export default function TechStoreDemo() {
  const [isFirefox, setIsFirefox] = useState(
    navigator.userAgent.toLowerCase().includes('firefox')
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

  const products = [
    { id: 1, name: 'Gaming Laptop', price: 120000, stock: 10 },
    { id: 2, name: 'Wireless Mouse', price: 2500, stock: 25 },
    { id: 3, name: 'Mechanical Keyboard', price: 7500, stock: 15 },
  ];

  const handleLogin = () => {
    if (form.username === 'admin' && form.password === '1234') {
      setIsAdmin(true);
      setLoggedIn(true);
    } else if (form.username && form.password) {
      setLoggedIn(true);
    }
  };

  if (!isFirefox) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-900 text-white">
        <h2 className="text-2xl mb-2">⚠️ Firefox Only</h2>
        <p>Please open this TechStore demo using Mozilla Firefox.</p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-800 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-2xl shadow-lg bg-gray-800 w-96">
          <div className="flex justify-center mb-4"><User size={48} /></div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Login to TechStore</h2>
          <Input className="mb-3" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
          <Input className="mb-3" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
          <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700"><LogIn className="mr-2" size={16}/>Login</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">TechStore</h1>
        <Button onClick={() => { setLoggedIn(false); setIsAdmin(false); }}>Logout</Button>
      </header>

      {!isAdmin ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Tech Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map(item => (
              <Card key={item.id} className="shadow-xl">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-blue-700">{item.name}</h3>
                  <p className="text-gray-700">Price: KES {item.price.toLocaleString()}</p>
                  <p className="text-gray-500">Stock: {item.stock}</p>
                  <Button className="mt-3 bg-green-600 hover:bg-green-700">Add to Cart</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2"><BarChart3/> Admin Dashboard</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-md p-4">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
                <p className="text-3xl text-green-700 font-bold">KES 240,000</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md p-4">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Orders This Week</h3>
                <p className="text-3xl text-blue-700 font-bold">32</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md p-4">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Low Stock Alerts</h3>
                <ul className="text-gray-700 list-disc list-inside">
                  <li>Wireless Mouse (5 left)</li>
                  <li>Mechanical Keyboard (3 left)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Manage Inventory</h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Item</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b">
                    <td className="p-2">{p.name}</td>
                    <td>KES {p.price.toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td><Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">Edit</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

