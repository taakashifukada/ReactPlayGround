import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from './Home';
import About from './About';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={
            <div>
              <h1>Layout</h1>
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
