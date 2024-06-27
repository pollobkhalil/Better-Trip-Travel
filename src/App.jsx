import React from 'react';
import { Routes, Route } from 'react-router-dom';


import TourList from './Components/TourList';
import TourDetails from './Components/TourDetails';
import Navbar from './Components/Navbar';


const App = () => {
  return (
    <div className="App">

      <Navbar/>
      <Routes>
        <Route path="/" element={<TourList/>} />
        <Route path="/tour/:id" element={<TourDetails/>} />
      </Routes>
    </div>
  );
};

export default App;
