import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleTokenValidation = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem('token');
        setToken('');
        return false;
      }
      return true;
    } catch (e) {
      localStorage.removeItem('token');
      setToken('');
      return false;
    }
  };

  const isValidToken = handleTokenValidation();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/dashboard" element={isValidToken ? <Dashboard token={token} /> : <Navigate to="/login" />} />
        <Route path="/products/create" element={isValidToken ? <ProductForm /> : <Navigate to="/login" />} />
        <Route path="/" element={isValidToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
