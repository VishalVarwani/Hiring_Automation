import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Homepage/Home';
import './App.css';
import Login from './components/Authentication/loginpage/login';
import Signup from './components/Authentication/signuppage/signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route>
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
