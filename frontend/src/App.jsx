import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Crawler from './views/Crawler';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/crawler" element={<Crawler />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
