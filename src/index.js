import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Slides from './pages/slides';
import CountContext from './pages/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="root-background font-pant ">
      <CountContext>
        <Router>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='view' element={<Slides/>}/>
          </Routes>
        </Router>
      </CountContext>
    </div>
  </React.StrictMode>
);