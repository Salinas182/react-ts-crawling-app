import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [])

  return (
    <div>
      <h1>Home</h1>

      {isLoggedIn && (
        <>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              setIsLoggedIn(false);
            }}
          >
            Log out
          </button>
          <button><Link to="/crawler">URL Crawler</Link></button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <button><Link to="/login">Log in</Link></button>
          <button><Link to="/register">Register</Link></button>
        </>
      )}
    </div>
  );
};

export default Home;
