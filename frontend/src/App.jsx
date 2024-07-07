import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import CrawlingJobDetails from './views/CrawlingJobDetails';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:jobId" element={<CrawlingJobDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
