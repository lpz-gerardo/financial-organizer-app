import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NavBar from './components/NavBar';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Outlet />
    </>
  )
} 

export default App;
