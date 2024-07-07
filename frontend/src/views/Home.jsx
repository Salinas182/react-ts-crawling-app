import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Crawler from '../components/Crawler';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [])

  return (
    <div>
      <h1>Crawler</h1>

      {isLoggedIn && (
        <Crawler />
      )}

      {!isLoggedIn && (
        <div style={styles.container}>
          <p>You must log in in order to be able to use this tool.</p>
          <div style={styles.buttonContainer}>
            <Link to="/login" style={styles.button}>Log in</Link>
            <Link to="/register" style={styles.button}>Register</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Home;
