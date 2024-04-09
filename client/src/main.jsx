import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
 } from 'react-router-dom';
 import store from './store.js';
 import { Provider } from 'react-redux';
 import { ThemeProvider } from '@mui/material';
 import { createTheme } from '@mui/material';
 import { themeSettings } from './theme.js';

 import Home from './pages/Home.jsx';
 import Login from './pages/Login.jsx';
 import Signup from './pages/Signup.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Route>
  )
);

const theme = createTheme(themeSettings());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <RouterProvider router={ router } />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
