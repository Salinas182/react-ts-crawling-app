import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Home</Link>
      </div>
      <div style={styles.right}>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Log In</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.button}>Log Out</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    background: '#333',
    color: '#fff',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    margin: '0 10px',
  },
};

export default NavBar;
