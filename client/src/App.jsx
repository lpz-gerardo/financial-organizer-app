import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import './App.css'

function App() {
  return (
   <React.Fragment>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />}/>
    </Routes>
   </React.Fragment> 
  )
} 

export default App
