import './App.css';
import { BrowserRouter as Router, Link,Routes, Switch, Route,useNavigate } from 'react-router-dom';
import * as React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebaseconfig';

import Login from './Login';
import Home from './Home';
import LoginAdmin from './LoginAdmin';
import Admin from './Admin';
import Voter from './Voter';

const App = () => {
  return(
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Voter" element={<Voter />} />
      <Route path="/Admin" element={<Admin /> }/>
      <Route path="/LoginAdmin" element={<LoginAdmin />} />
    </Routes>
);}

export default App;
