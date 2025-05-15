import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">CapriTech</Link>
        {!userInfo && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {userInfo?.isAdmin && (
          <>
            <Link to="/admin/dashboard">Admin</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/content">Website</Link>
          </>
        )}
        {userInfo && !userInfo.isAdmin && (
          <>
            <Link to="/customer/dashboard">My Account</Link>
            <Link to="/cart">Cart</Link>
          </>
        )}
      </div>

      {userInfo && (
        <div className="navbar-right">
          <span>{userInfo.name}</span>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
