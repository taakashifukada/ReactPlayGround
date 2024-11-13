import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom"
import Home from './components/Home';
import Typography from './components/Typography';
import Login from './components/Login';
import Form from './components/Form';
import { RickAndMortyList } from './components/RickAndMorty';


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
          <Route path="/typo" element={<Typography />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path='/rickandmorty' element={<RickAndMortyList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
