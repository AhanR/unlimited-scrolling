import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Slides from './pages/slides';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="root-background">
      <Router>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='view' element={<Slides/>}/>
        </Routes>
      </Router>
    </div>
  </React.StrictMode>
);