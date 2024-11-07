import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Form from './components/Form';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <div>
              <h1>React App</h1>
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
