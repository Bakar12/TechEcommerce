import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <nav style={{ backgroundColor: '#ddd', padding: '10px' }}>
      <Link to="/">Home</Link> | 
      {!userInfo && <>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link>
      </>}

      {userInfo && userInfo.isAdmin && (
        <>
          <Link to="/admin/dashboard">Admin Dashboard</Link> | 
          <Link to="/admin/products">Manage Products</Link> | 
          <Link to="/admin/content">Edit Website</Link>
        </>
      )}

      {userInfo && !userInfo.isAdmin && (
        <>
          <Link to="/customer/dashboard">My Account</Link> | 
          <Link to="/cart">Cart</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
