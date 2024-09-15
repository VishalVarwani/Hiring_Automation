import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Homepage/Home';
import './App.css';
import Login from './components/Authentication/loginpage/login';
import Signup from './components/Authentication/signuppage/signup';
import Headercommon from './Headerpage/headercommon';

function App() {
  return (
    <div className="App">
      <Router>
        <Headercommon/>
        <Routes>
          <Route path="home" element={<Home />} />
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
