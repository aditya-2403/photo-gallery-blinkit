import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app'; // Use compat/app instead of app
import 'firebase/compat/auth'; // Use compat/auth instead of auth
import 'firebase/compat/storage'; // Use compat/storage instead of storage
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import SignIn from './components/SignIn';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';


const firebaseConfig = {
  apiKey: "AIzaSyAZh-Imy2dmkgQCauPT7NEhOzAQWD11iKQ",
  authDomain: "photo-gallery-18cab.firebaseapp.com",
  projectId: "photo-gallery-18cab",
  storageBucket: "photo-gallery-18cab.appspot.com",
  messagingSenderId: "941605718240",
  appId: "1:941605718240:web:37543cf7802dd147ef6885"
};

firebase.initializeApp(firebaseConfig);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <NotFound/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  }
]);
ReactDOM.render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
  document.getElementById('root')
);
