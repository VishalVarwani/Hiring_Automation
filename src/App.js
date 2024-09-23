import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Homepage/Home';
import './App.css';
import Login from './components/Authentication/loginpage/login';
import Signup from './components/Authentication/signuppage/signup';
import Headercommon from './components/Headerpage/headercommon';
import ThankYou from './components/Complier/Thankyou';
import { Editor } from '@monaco-editor/react';
import CodingTest from './components/Complier/Editor';
import CandidateForm from './components/Complier/Details/Form';
import Candidateresults from './components/Results/Candidateresults';
import Instructions from './components/Complier/Instructions';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route>
            <Route path="/" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />

            <Route path="coding-test" element={<CodingTest/>} />
            <Route path="thankyou" element={<ThankYou/>} />
            <Route path="candidateform" element={<CandidateForm/>} />
            <Route path="candidateresults" element={<Candidateresults/>} />
            <Route path="instructions" element={<Instructions/>} />



            

            


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
