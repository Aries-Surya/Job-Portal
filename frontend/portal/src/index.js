import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"
import Home from './pages/Home';
import SignUp from './pages/Sign_Up';
// import theme from './themes/theme';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  )

);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider >

      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
